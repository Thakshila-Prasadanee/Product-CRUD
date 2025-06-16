import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getUserProducts,
    updateProduct
} from "../controllers/product.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.get('/:id', authorize, getProductById);

productRouter.post('/', authorize, createProduct);

productRouter.put('/:id', authorize, updateProduct);

productRouter.delete('/:id', authorize, deleteProduct);

productRouter.get('/user/:id', authorize, getUserProducts);

export default productRouter;