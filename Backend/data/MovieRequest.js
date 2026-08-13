import mongoose from "mongoose";

const MovieRequestSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
    genre: {
        type: String,
        required: false
    },
    reason: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
},
{ timestamps: true });

export default mongoose.model('MovieRequest', MovieRequestSchema);
