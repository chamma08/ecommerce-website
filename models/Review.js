import { Schema, model, models } from "mongoose";

const reviewSchema = new Schema ({
    name: String,
    summary: String,
    review: {type: String, required: true},
    
},{timestamps: true});

export const Review = models.Review || model('Review',reviewSchema);