import { Router } from 'express';
import { uploadBook } from '../middleware/book-file.js';
import axios from 'axios';
import {Book} from '../models/book.js';
import { unlink } from 'node:fs/promises';


const router = Router();

router.get('/', async (_, res) => {
    try {
        const books = await Book.find();
        res.render("books/index", {
            title: "Books",
            books: books,
        });
    } catch (e) {
        res.redirect('/404');
    }

});

router.get('/create', async (req, res) => {
    res.render("books/create", {
        title: "Добавление книги",
        book: {},
    });
});

router.post('/create', uploadBook.single('book-img'), async (req, res) => {
    let fileBook = null;
    if(req.file){
        const { path } = req.file
        fileBook = path;
    }
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    try {
        const newBook = new Book({title, description, authors, favorite: Boolean(favorite), fileCover, fileName, fileBook});
        await newBook.save();
        res.redirect('/books')
    } catch (e) {
        res.redirect('/404')
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        const { data } = await axios.post(`http://counter:3002/counter/${id}/incr`, {});
        res.render("books/view", {
            title: "Book | view",
            book,
            views: data.views
        });
    } catch (e) {
        res.redirect('/404');
    }
});

router.get('/:id/update', async (req, res) => {
    const {id} = req.params

    try {
        const book = await Book.findById(id).select('-__v');
        res.render("books/update", {
            title: "Book | update",
            book,
        });
    } catch (e) {
        res.redirect('/404');
    }
});

router.post('/:id/update',uploadBook.single('book-img'), async (req, res) => {
    const {id} = req.params
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    try {
        const book = await Book.findById(id).select('-__v');
        let fileBook = book.fileBook;
        if(req.file){
            const { path } = req.file
            unlink(fileBook);
            fileBook = path;
        }
        await book.updateOne({
            title,
            description,
            authors,
            favorite: Boolean(favorite),
            fileCover,
            fileName,
            fileBook
        });
        res.redirect(`/books/${id}`);
    } catch (e) {
        res.redirect(`/404`);
    }

});

router.post('/:id/delete', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        await book.deleteOne();
        await unlink(book.fileBook);
        res.redirect('/books');
    } catch (e) {
        res.redirect('/404');
    }
});

router.get('/:id/download', async (req, res) => {

    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        res.download(book.fileBook, book.id, err => {
            if (err)
                res.redirect('/404');
        });
    } catch (e) {
        res.redirect('/404');
    }
});

export { router };