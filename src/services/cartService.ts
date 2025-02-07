import prisma from "../config/prisma";

class CartService {
 
  async getCart(req: { customerId: string }) {
    const carts = await prisma.cart.findMany({
      where: { customerId: parseInt(req.customerId) },
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

  async removeCart(req: { customerId: number }) {
    const cart = await prisma.cart.deleteMany({
      where: {
        customerId: req.customerId
      }
    });

    return cart;
  }

  async insertCart(req: { customerId: number, productId: number, quantity: number }) {
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

  async removeAllCart(req: { customerId: number, productId: number }) {
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
}

export default new CartService();