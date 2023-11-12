const mongoose = require('mongoose')

const ArtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A name for the piece is required'],
        minLength: [2, "Name must be atleast 2 characters"]
    },

    artist: {
        type: String,
        required: [true, 'An artist name for the piece is required'],
        minLength: [2, "Artist must be atleast 2 characters"]
    },

    height: {
        type: Number,
        required: [true, 'Please tell us the height of the piece'],
        min: [5, 'Height must be at least 5 inches']
    },

    width: {
        type: Number,
        required: [true, 'Please tell us the width of the piece'],
        min: [5, 'Width must be at least 5 inches']
    },

    description: {
        type: String,
        required: [true, 'A description for the piece is required'],
        maxLength: [2000, 'Too long. please used 255 charaters or less']
    },

    type: {
        type: String,
        required: [true, 'please select an option']
    }

}, { timestamps: true });
module.exports = mongoose.model("Art", ArtSchema);
