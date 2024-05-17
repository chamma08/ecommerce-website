import { Schema, model, models } from "mongoose";

const contentSchema = new Schema ({
    title: {type: String, required: true},
    description: String,
    images: [{type: String}],
}, {timestamps: true});

export const Content = models.Content || model('Content',contentSchema);