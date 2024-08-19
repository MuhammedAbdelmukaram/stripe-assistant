import mongoose from 'mongoose';

const OfferSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userPercent: {
        type: Number,
        required: true
    },
    users: {
        type: Number,
        required: true
    },
    purchases: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
