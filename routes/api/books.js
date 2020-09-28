const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const books = require('../../Books');

// Gets All Books
router.get('/', (req, res) => {
    res.json(books);
})

//Get Single Member
router.get('/:id', (req, res) => {
    const found = books.some(book => book.id === parseInt(req.params.id));

    if(found){
        res.json(books.filter(book => book.id === parseInt(req.params.id)));
    }
    else{
        res.status(400).json({msg: `No Book with the id of ${req.params.id}`});
    }
});

// Create Member
router.post('/', (req, res) => {
    const newBook = {
        id: uuid.v4(),
        name: req.body.name,
        author: req.body.author,
        publisher: req.body.publisher,
        isbn_number: req.body.isbn_number,
        price: req.body.price,
        lent: false,
        returned: false,
    }

    if(!newBook.name || !newBook.author || !newBook.publisher || !newBook.isbn_number || !newBook.price){
        return res.status(400).json({ msg: `Please include a name, author, publisher, isbn_number and price`});
    }

    books.push(newBook);
    res.json(books); //for json
    // res.redirect('/'); //for templates
});

//Update Books
router.put('/:id', (req, res) => {
    const found = books.some(book => book.id === parseInt(req.params.id));

    if(found){
        const updBook = req.body;
        books.forEach(book => {
            if(book.id === parseInt(req.params.id)){
                book.name = updBook.name ? updBook.name : book.name;
                book.author = updBook.author ? updBook.author : book.author;
                book.publisher = updBook.publisher ? updBook.publisher : book.publisher;
                book.isbn_number = updBook.isbn_number ? updBook.isbn_number : book.isbn_number;
                book.price = updBook.price ? updBook.price : book.price;

                res.json({ msg: 'Member updated', book});
            }
        });
    }
    else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

// Delete Member
router.delete('/:id', (req, res) => {
    const found = books.some(book => book.id === parseInt(req.params.id));

    if(found){
        res.json({ msg: 'Member Deleted', books: books.filter(book => book.id !== parseInt(req.params.id))});
    }
    else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router;