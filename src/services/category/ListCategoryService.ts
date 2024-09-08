import prismaClient from "../../prisma"

class ListCategoryService {
    async execute(){
        // findMany: busca todos os dados dentro da tabela category
        const categories = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        })

        return categories;
    }
}

export {ListCategoryService}