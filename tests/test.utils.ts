import prisma from "../src/config/prisma";

export class UserTest {

    static async delete() {
        await prisma.customer.deleteMany({
            where: {
              email: "test@example.com"
            }
        })
    }

    static async create() {
        await prisma.customer.create({
          data: {
            email: 'test@example.com',
            password: '$2b$10$3.dOpPqGY1uaw4vmeNvdvuas44//pXBn6Tc15iNVlSORNIJWdM5K6',
            name: 'Test',
            phone: '087665544444',
            address: 'jl. test'
          },
        })
    }
  }