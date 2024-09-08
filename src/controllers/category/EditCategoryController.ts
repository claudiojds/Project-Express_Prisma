import { Request, Response } from "express"
import { EditCategoryRequest } from "../../models/interfaces/category/EditCategoryRequest"
import { EditCategoryService } from "../../services/category/EditCategoryService"

class EditCategoryController {

    async handle (request: Request, response: Response){
        // pegando o category_id via query
        const {name} = request.body
        const category_id = request.query.category_id as string;

        const editCategoryService = new EditCategoryService();
        const categoryEdit = editCategoryService.execute({name, category_id})

        return response.json(categoryEdit)
    }

}

export {EditCategoryController}