import prisma from "../config/prisma";

export class CartService {
 
  static async getCart(customerId: string) {
    const carts = await prisma.cart.findMany({
      where: { customerId: parseInt(customerId) },
      include: {
        product: {
          include: {
            images: true, // Include images di dalam product
          },
        },
      },
    });

    return carts;
  }

  static async removeCart(req: { customerId: number, productId: number }) {
    const cart = await prisma.cart.delete({
      where: {
        customerId_productId: {
          customerId: req.customerId,
          productId: req.productId
        }
      },
    });
    return cart;
  }

  static async removeAllCart(req: { customerId: number }) {
    const cart = await prisma.cart.deleteMany({
      where: {
        customerId: req.customerId
      }
    });
    return cart;
  }

  static async insertCart(req: { customerId: number, productId: number, quantity: number }) {
    const cart = await prisma.cart.upsert({
      where: {
        customerId_productId: {
          customerId: req.customerId,
          productId: req.productId
        }
      },
      update: {
        quantity: {
          increment: req.quantity
        }
      },
      create: {
        customerId: req.customerId,
        productId: req.productId,
        quantity: req.quantity
      },
    });

    return cart;
  }
}