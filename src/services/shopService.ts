import prisma from "../config/prisma";

export class ShopService {
  
  static async getData() {
    const shop = await prisma.shop.findUnique({
      where: {
        id: 1
      },
      select: {
        name: true,
        address: true,
        phone: true,
        email: true,
        description: true,
        image: true 
      }
    })

    return shop;
  }
}