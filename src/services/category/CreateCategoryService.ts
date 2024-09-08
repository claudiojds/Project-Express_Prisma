import prismaClient from "../../prisma";
import { CategoryRequest } from "../../models/interfaces/category/CategoryRequest";


class CreateCategoryService {
    async execute ({name}: CategoryRequest) {

        if(name === "" || name === null || !name){
            throw new Error("Nome invalido!")
        }

        const category = await prismaClient.category.create({
            // crinado uma categoria no banco de dados
            data: {
                name: name
            },
            select: {
                id: true,
                name: true
            }
        })

        return category;
    }

}

export {CreateCategoryService};