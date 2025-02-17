import prisma from "../config/prisma";

export class ShopService {
  
  static async getData() {
    const shop = await prisma.shop.findUnique({
      where: {
        id: 1
      }
    })

    return shop;
  }
}