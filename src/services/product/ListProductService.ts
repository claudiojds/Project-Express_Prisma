import prismaClient from "../../prisma"

class ListProductService {
    async execute(){
        const products = await prismaClient.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                amount: true
            },
            orderBy: {
                created_at: 'desc'
            },
        });

        return products;
    }
}

export {ListProductService}