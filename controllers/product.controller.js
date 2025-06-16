import Product from '../models/product.model.js';

// GET all products
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

// GET product by ID
export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// CREATE product
export const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// UPDATE product
export const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

// DELETE product
export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// GET all products for a user (if user is associated)
export const getUserProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ user: req.params.id }); // Requires 'user' field in schema
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

