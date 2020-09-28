const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const books = require('./Books');
// const mongoose = require('mongoose');

// Init express
const app = express();


// init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

app.get('/books', (req, res) => res.render('books', {
    title: 'Books',
    books
}));

// PORT
const PORT = process.env.PORT || 5000;

// App listener
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members Api Routes
app.use('/api/members', require('./routes/api/members'));
app.use('/api/books', require('./routes/api/books'));
