import { Router } from 'express';
import { Book } from '../classes/book.js';
import { store } from '../store/store.js';
import { uploadBook } from '../middleware/book-file.js';


const router = Router();

router.get('/api/books', (_, res) => {
    const {books} = store;
    res.json(books)
});

router.get('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404).json('404 | ресурс не найден')
    }

});

router.post('/api/books', uploadBook.single('book-img'), (req, res) => {
    const {books} = store;
    let fileBook = null;
    if(req.file){
        const { path } = req.file
        fileBook = path;
    }

    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook)

    res.status(201).json(newBook)
});

router.put('/api/books/:id', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        }

        res.json(books[idx])
    } else {
        res.status(404).json('404 | ресурс не найден')
    }
});

router.delete('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json("ok")
    } else {
        res.status(404).json('404 | ресурс не найден')
    }
});

router.get('/api/books/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const book = books.find(el => el.id === id)
    if(book !== undefined){
        res.download(book.fileBook, book.id, err => {
            if (err)
            res.status(404).json('404 | ресурс не найден');
        });
    } else {
        res.status(404).json('404 | ресурс не найден')
    }
    
});

export { router };