import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: 5,
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be greater than 0']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [0, 'Quantity cannot be negative']
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;