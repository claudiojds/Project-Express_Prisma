import prismaClient from "../../prisma";
import { EditCategoryRequest } from "../../models/interfaces/category/EditCategoryRequest";

class EditCategoryService {
    async execute ({name, category_id}: EditCategoryRequest) {
        if(category_id === "" || name === "" || !category_id || !name){
            throw new Error ("Argumentos invalidos para categoria!")
        }

        const productEdit = await prismaClient.category.update({
            // selecione pelo id
            where: {
                id: category_id
            },
            // para atualizar o campo nome
            data: {
                name: name
            }

        })

        return productEdit;
    }
}

export {EditCategoryService}