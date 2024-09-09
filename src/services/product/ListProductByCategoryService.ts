import prismaClient from "../../prisma"

interface ListProductByCategoryRequest {
    category_id: string;
}

class ListProductByCategoryService {

    async execute ({category_id}: ListProductByCategoryRequest) {

        const findProductByCategoryId = await prismaClient.product.findMany({
            where: {
                category_id: category_id
            }
        });

        return findProductByCategoryId;
    }
}

export {ListProductByCategoryService}