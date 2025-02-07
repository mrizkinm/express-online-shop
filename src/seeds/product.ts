import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// 🔹 Daftar kategori Gunpla
const categories = [
  { name: "High Grade (HG)", image: faker.image.url() },
  { name: "Master Grade (MG)", image: faker.image.url() },
  { name: "Perfect Grade (PG)", image: faker.image.url() },
  { name: "Real Grade (RG)", image: faker.image.url() },
  { name: "Super Deformed (SD)", image: faker.image.url() },
];

// 🔹 Daftar nama Gundam berdasarkan kategori
const gundamModels = {
  "High Grade (HG)": [
    "HG RX-78-2 Gundam",
    "HG Zeta Gundam",
    "HG Unicorn Gundam",
    "HG Gundam Exia",
    "HG Gundam Barbatos",
  ],
  "Master Grade (MG)": [
    "MG Freedom Gundam",
    "MG Strike Gundam",
    "MG Wing Gundam Zero EW",
    "MG Gundam Astray Red Frame",
    "MG Sinanju Stein",
  ],
  "Perfect Grade (PG)": [
    "PG Unicorn Gundam",
    "PG Strike Freedom Gundam",
    "PG RX-78-2 Gundam",
    "PG Exia Gundam",
    "PG Zeta Gundam",
  ],
  "Real Grade (RG)": [
    "RG Destiny Gundam",
    "RG Sazabi",
    "RG Nu Gundam",
    "RG Tallgeese III",
    "RG God Gundam",
  ],
  "Super Deformed (SD)": [
    "SD BB Senshi RX-78-2",
    "SD Cross Silhouette Zeta Gundam",
    "SD Knight Gundam",
    "SD Barbatos Lupus Rex",
    "SD Sinanju",
  ],
};

async function main() {
  console.log("Seeding database...");

  const createdCategories = await Promise.all(
    categories.map(async (category) => {
      return prisma.category.create({
        data: category,
      });
    })
  );

  // 🔹 Seed Products
  for (const category of createdCategories) {
    const products = gundamModels[category.name as keyof typeof gundamModels] || [];
    for (const productName of products) {
      await prisma.product.create({
        data: {
          name: productName,
          price: faker.number.int({ min: 300000, max: 5000000 }), // Harga acak 300K - 5jt
          categoryId: category.id,
          description: `Model kit dari ${productName}, sangat detail dan kolektibel.`,
          quantity: faker.number.int({ min: 1, max: 50 }), // Stok acak
          isFeatured: faker.datatype.boolean(),
          isArchived: false,
        },
      });
    }
  }

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
