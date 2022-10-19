
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    acno: {
        type: Number,
        required: true

    },
    phoneno: {
        type: Number,
        required: true
    },
    initialbalance: {
        type: Number,
        required: true
    },
    creator: {
        type: Object,
        required: true
    }
},

    { timestamps: true }

);


module.exports = mongoose.model('Posts', postSchema);
