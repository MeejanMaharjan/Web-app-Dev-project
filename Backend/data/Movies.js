
import mongoose from "mongoose";

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    poster_url: {
        type: String,
        required: false
    },
    synopsis: {
        type: String,
        required: false
    },
cast: {
        type: [Object],
        required: false
    }
}, 
{ timestamps: true });

export default mongoose.model('Movie', MovieSchema);