import prisma from "../config/prisma";

export class CategoryService {
  
  static async getCategory(req: {limit?: string}) {
    const limit =  req.limit ? Number(req.limit) : undefined;
    const category = await prisma.category.findMany({
      take: limit,
      include: {
        products: true,
      },
    })

    return category
  }
}