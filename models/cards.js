import { model, models, Schema } from "mongoose";

const CardSchema = new Schema({
    CardNo: {type: Number,
        required: true
    },
    Name: {type: String,
        required: true
    },
    Month: {type: Number,
        required: true
    },
    Year: {type: Number,
        required: true
    },
    CVV: {type: Number,
        required: true
    }
},{timestamps: true})

export const cards = models.cards || model('cards',CardSchema);