import prisma from "../config/prisma";
import { ResponseError } from "../errors/responseError";
import midtransClient from 'midtrans-client';

export class OrderService {

  private static apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!
  });

  private static coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
    clientKey: process.env.MIDTRANS_CLIENT_KEY!
  });

  static async getOrder(customerId: string) {
    if (isNaN(Number(customerId))) {
      throw new ResponseError(400, "Invalid customer ID");
    }
    const orders = await prisma.order.findMany({
      where: { customerId: parseInt(customerId) },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return { 
      data: orders, 
      total: orders.length 
    };
  }

  static async orderCallback(req: { order_id: string, transaction_status: string, fraud_status: string }) {
    // let order_id = 'TRX-1737731786289';
    // let transaction_status = 'cancel';
    // let fraud_status = 'accept';

    const order_id = req.order_id;
    const transaction_status = req.transaction_status;
    const fraud_status = req.fraud_status;

    // Pastikan data dari Midtrans valid
    const transactionStatus = await this.apiClient.transaction.status(order_id);
    if (transactionStatus.order_id !== order_id) {
      throw new ResponseError(404, "Order not found");
    }

    const orders = await prisma.order.findUnique({
      where: { orderTrxId: order_id },
      include: {
        items: true
      }
    });

    if (!orders) {
      throw new ResponseError(404, "Order not found");
    }

    // Perbarui status pembayaran di database
    let status = '';
    if (transaction_status === 'capture') {
      // Capture hanya untuk kartu kredit
      status = fraud_status === 'accept' ? 'Processed' : 'Fraud';
      if (status == 'Processed') {
        await this.updateSettlementProduct(orders.id, status);
      }
    } else if (transaction_status === 'settlement') {
      status = 'Processed';
      await this.updateSettlementProduct(orders.id, status);
    } else if (transaction_status === 'pending') {
      status = 'Pending';
    } else if (transaction_status === 'cancel' || transaction_status === 'expire') {
      status = 'Canceled';
      const result = await this.updateProductStockFromOrder(orders.id, orders.items, status);
      if (!result.success) {
        throw new ResponseError(result.httpStatus, result.error);
      }
    } else if (transaction_status === 'deny') {
      status = 'Canceled';
      const result = await this.updateProductStockFromOrder(orders.id, orders.items, status);
      if (!result.success) {
        throw new ResponseError(result.httpStatus, result.error);
      }
    }

    return{ message: 'Callback processed successfully' };
  }

  private static async updateSettlementProduct(id: number, status: string) {
    await prisma.order.updateMany({
      where: {
        id: id
      },
      data: {
        status: status
      }
    })
  }
  
  private static async updateProductStockFromOrder(id: number, items: any[], status: string) {
    try {
      const updateProductQuantities = await prisma.$transaction(async (tx) => {
        // Update status order menjadi Canceled
        await tx.order.updateMany({
          where: {
            id: id
          },
          data: {
            status: status
          }
        });
    
        // Cek stok untuk semua produk
        const products = await Promise.all(items.map(item =>
          tx.product.findUnique({
            where: { id: item.productId }
          })
        ));
    
        // Validasi stok
        items.forEach((item, index) => {
          const product = products[index];
          if (!product) {
            throw new ResponseError(400, `Product with id ${item.productId} not found`);
          }
          if (product.quantity < item.quantity) {
            throw new ResponseError(400, `Insufficient stock for product ${item.productId}`);
          }
        });
    
        // Jika semua stok mencukupi, lakukan update
        const updates = await Promise.all(items.map(item =>
          tx.product.update({
            where: { id: item.productId },
            data: {
              quantity: {
                increment: item.quantity
              }
            }
          })
        ));
    
        return updates;
      });
  
      return {
        success: true,
        data: updateProductQuantities,
        httpStatus: 200
      };
  
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        httpStatus: 500
      };
    }
  }

  static async orderSnap(req: { id: number }) {
    const id = req.id;
    if (!id) {
      throw new ResponseError(400, "Order id is required");
    }

    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Validate order data
    if (!order) {
      throw new ResponseError(404, 'Order not found');
    }

    // Prepare Midtrans Snap data
    const snapData = {
      transaction_details: {
        order_id: order.orderTrxId,
        gross_amount: order.totalAmount,
      },
      customer_details: {
        customer_id: order.customerId,
        first_name: (order.info as { name: string; phone: string }).name ?? '',
        phone: (order.info as { name: string; phone: string }).phone ?? '',
      },
      item_details: order.items.map((item) => ({
        id: item.productId,
        price: item.price,
        quantity: item.quantity,
        name: item.product.name
      })),
    };

    // Generate Snap Token
    const snapResponse = await this.apiClient.createTransaction(snapData);
    
    // Save the snap token in the order record
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        snapToken: snapResponse.token, // Save snapToken to the order
      },
    });
    return { snapToken: snapResponse.token };
  }

  static async orderStatus(req: { id: number }) {
    const id = req.id;
    if (!id) {
      throw new ResponseError(400, "Order id is required");
    }

    const order = await prisma.order.findUnique({
      where: {
        id: id,
        status: 'Pending',
      },
      select: {
        snapToken: true, // Pastikan token Snap diambil
        orderTrxId: true,
      },
    });

    if (!order) {
      throw new ResponseError(404, 'Order not found');
    }

    // const paymentStatus = await this.coreApi.transaction.status(order.orderTrxId);

    return {snapToken: order.snapToken};
  }

  static async createOrder(req: { customerId: number, info: any , items: any[], totalAmount: number }) {
    const customerId = req.customerId;
    const info = req.info;
    const items = req.items;
    const totalAmount = req.totalAmount;

    // Validate order data
    if (!items || items.length === 0) {
      throw new ResponseError(400, 'Items are required');
    }

    if (!totalAmount || totalAmount <= 0) {
      throw new ResponseError(400, 'Invalid total amount');
    }

    if (!info || !info.name || !info.phone) {
      throw new ResponseError(400, 'Customer info is incomplete');
    }

    // Create order with transaction to ensure atomic operation
    const order = await prisma.$transaction(async (prismadb) => {
      // update stock
      await Promise.all(
        items.map(async (item: any) => {
          const product = await prismadb.product.findUnique({
            where: { id: item.productId },
          });

          if (!product || product.quantity < item.quantity) {
            throw new Error(JSON.stringify({
              errors: `Insufficient stock for product ID: ${item.productId}`
            }));
          }

          await prismadb.product.update({
            where: { id: item.productId },
            data: {
              quantity: { decrement: item.quantity },
            },
          });
        })
      );

      // Create new order
      const newOrder = await prismadb.order.create({
        data: {
          orderTrxId: `TRX-${Date.now()}`,
          customerId: customerId,
          info: info,
          totalAmount,
          status: 'Pending',
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        },
      });

      // Prepare Midtrans Snap data
      const snapData = {
        transaction_details: {
          order_id: newOrder.orderTrxId,
          gross_amount: newOrder.totalAmount,
        },
        customer_details: {
          customer_id: customerId,
          first_name: info.name,
          phone: info.phone
        },
        item_details: newOrder.items.map((item) => ({
          id: item.productId,
          price: item.price,
          quantity: item.quantity,
          name: item.product.name
        })),
      };

      // Generate Snap Token
      const snapResponse = await this.apiClient.createTransaction(snapData);

      // Save the snap token in the order record
      await prismadb.order.update({
        where: { id: newOrder.id },
        data: {
          snapToken: snapResponse.token, // Save snapToken to the order
        },
      });

      return { 
        order: newOrder, 
        snapToken: snapResponse.token 
      };
    });

    return order;

  }
}