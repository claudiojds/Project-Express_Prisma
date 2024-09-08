import { Request,Response } from "express"
import { RemoveCategoryService } from "../../services/category/RemoveCategoryService"

class RemoveCategoryController {
    async hadle (request: Request, response: Response){
        const category_id = request.query.category_id as string;
        const removeCategoryService = new RemoveCategoryService();
        const removeCategory = removeCategoryService.execute({category_id});

        return response.json({message: "Categoria removida com sucesso!"});
    }
}

export {RemoveCategoryController}