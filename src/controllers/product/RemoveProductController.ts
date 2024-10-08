import { Request, Response } from "express";
import { RemoveProductService } from "../../services/product/RemoveProductService";

class RemoveProductController {
    async handle (request: Request, response: Response){
        const product_id = request.query.product_id as string;
        const removeProductService = new RemoveProductService();
        const removeProduct = await removeProductService.execute({product_id});

        return response.json(removeProduct);
    }
};

export {RemoveProductController};