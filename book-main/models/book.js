import {Schema, model} from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        required: true,
    },
    fileCover: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    fileBook: {
        type: String,
        required: true,
    },
})
const  Book = model('Book', bookSchema);

export {Book};