import prisma from "../config/prisma";
import { ResponseError } from "../errors/responseError";

export class ProductService {
  
  static async getDetailProduct(productId: string) {
    const products = await prisma.product.findUnique({
      where: {
        id: parseInt(productId)
      },
      include: {
        category: true,
        images: true
      }
    })

    return products;
  }

  static async getProduct(req: {page?: string, limit?: string, search?: string, categoryId?: string, isFeatured?: string} ) {
    // Calculate skip for pagination
    const page = Number(req.page) || 1;
    const limit = Number(req.limit) || 10;
    const skip = (page - 1) * limit;

    const categoryId = req.categoryId ? Number(req.categoryId) : undefined;

    // Pastikan categoryId bukan NaN
    if (req.categoryId && isNaN(Number(categoryId))) {
      throw new ResponseError(400, "Invalid categoryId");
    }

    // Build where clause based on filters
    const where = {
      isArchived: false,
      ...(req.search && {
        OR: [
          { name: { contains: req.search, mode: "insensitive" as const } },
          { description: { contains: req.search, mode: "insensitive" as const } },
        ],
      }),
      ...(categoryId && { categoryId }),
      ...(req.isFeatured !== undefined && { isFeatured: req.isFeatured === "true" }),
    };

    // Get products with pagination and filters
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: true,
          category: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  static async searchProduct(req: {query?: string} ) {
    const query = req.query;
    if (!query || query.trim() === "") {
      throw new ResponseError(400, "Query cannot be empty");
    }
    const products = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } }, // Pencarian pada nama produk
          { description: { contains: query, mode: "insensitive" } }, // Pencarian pada deskripsi produk
        ],
        isArchived: false, // Jangan tampilkan produk yang diarsipkan
      },
      select: {
        id: true,
        name: true,
        price: true,
        isFeatured: true,
        images: {
          select: { url: true }, // Ambil URL gambar jika tersedia
        },
        category: {
          select: { name: true }, // Nama kategori produk
        },
      },
    });
    return products;
  }
}