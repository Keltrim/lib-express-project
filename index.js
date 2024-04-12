import express from 'express';
import { v4 as uuidv4 } from 'uuid';

class Book {
    constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName = "") {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover,
        this.fileName = fileName;
    }
}

const store = {
    books: []
};

const app = express();
app.use(express.json());

app.post('/api/user/login', (_, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (_, res) => {
    const {books} = store;
    res.json(books)
});

app.get('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if( idx !== -1) {
        res.json(books[idx])
    } else {
        res.status(404).json('404 | ресурс не найден')
    }

});

app.post('/api/books', (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
    books.push(newBook)

    res.status(201).json(newBook)
});

app.put('/api/books/:id', (req, res) => {
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
        res.status(404)
        res.json('404 | ресурс не найден')
    }
});

app.delete('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json("ok")
    } else {
        res.status(404)
        res.json('404 | ресурс не найден')
    }
});

const PORT = process.env.PORT || 3000
app.listen(PORT)