import { Router } from 'express';
import { Book } from '../classes/book.js';
import { store } from '../store/store.js';
import { uploadBook } from '../middleware/book-file.js';
import axios from 'axios';

const router = Router();

router.get('/', (_, res) => {
    const {books} = store;
    res.render("books/index", {
        title: "Books",
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Добавление книги",
        book: {},
    });
});

router.post('/create', uploadBook.single('book-img'), (req, res) => {
    const {books} = store;
    let fileBook = null;
    if(req.file){
        const { path } = req.file
        fileBook = path;
    }
 
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.redirect('/books')
});

router.get('/:id', async (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)

    if ( idx === -1) {
        res.redirect('/404');
    }
    const { data } = await axios.post(`http://counter:3002/counter/${id}/incr`, {});
    res.render("books/view", {
        title: "Book | view",
        book: books[idx],
        views: data.views
    });

});

router.get('/:id/update', (req, res) => {
    const {books} = store;
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx === -1) {
        res.redirect('/404');
    } 

    res.render("books/update", {
        title: "Book | update",
        book: books[idx],
    });
});

router.post('/:id/update',uploadBook.single('book-img'), (req, res) => {
    const {books} = store;
    const {id} = req.params
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const idx = books.findIndex(el => el.id === id)
    
    if (idx === -1){
        res.redirect(`/404`);
    }

    let fileBook = books[idx].fileBook;

    if(req.file){
        const { path } = req.file
        fileBook = path;
    }
 
    books[idx] = {
        ...books[idx],
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
        fileBook
    }
    res.redirect(`/books/${id}`);
});

router.post('/:id/delete', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)
     
    if(idx === -1){
        res.redirect('/404');
    }

    books.splice(idx, 1)
    res.redirect('/books');
});

router.get('/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const book = books.find(el => el.id === id)
    if(book === undefined){
        res.redirect('/404');
    } 
    res.download(book.fileBook, book.id, err => {
        if (err)
        res.redirect('/404');
    });
    
});

export { router };