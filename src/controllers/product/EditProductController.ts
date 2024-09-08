import { Request, Response } from "express"
import { EditProductService } from "../../services/product/EditProductService"
import { EditProductRequest } from "../../models/interfaces/product/EditProductRequest"

class EditProductController {

    async handle (request: Request, response: Response){
        const {name, price, description, banner, product_id, amount}: EditProductRequest = request.body;
        const editProductService = new EditProductService();

        const productEdit = editProductService.execute({name, price, description, banner, product_id, amount});

        return response.json(productEdit)
    }
}

export {EditProductController}