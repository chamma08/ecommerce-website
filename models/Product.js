import { Schema, model, models } from "mongoose";

const productSchema = new Schema ({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type: String}],
});

export const Product = models.Product || model('Product',productSchema);