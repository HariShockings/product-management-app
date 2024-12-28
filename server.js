const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path'); // Required to serve static files from the build folder

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce_db',
});

db.connect(err => {
    if (err) {
        console.log('Database connection failed:', err);
    } else {
        console.log('Database connected.');
    }
});

// Routes for Products
app.get('/api/products', (req, res) => {
    const { search, minPrice, maxPrice, sortOrder, category } = req.query;
    let query = 'SELECT * FROM products';
    let queryParams = [];
    let orderBy = 'ORDER BY id';

    if (sortOrder === 'desc') {
        orderBy = 'ORDER BY id DESC';
    }

    const conditions = [];
    if (search) {
        conditions.push('(name LIKE ? OR description LIKE ?)');
        queryParams.push(`%${search}%`, `%${search}%`);
    }
    if (minPrice) {
        conditions.push('price >= ?');
        queryParams.push(Number(minPrice));
    }
    if (maxPrice) {
        conditions.push('price <= ?');
        queryParams.push(Number(maxPrice));
    }
    if (category) {
        conditions.push('category = ?');
        queryParams.push(category);
    }

    if (conditions.length > 0) {
        query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` ${orderBy}`;

    db.query(query, queryParams, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        res.json(result[0]);
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, description, category } = req.body;
    db.query('INSERT INTO products (name, price, description, category) VALUES (?, ?, ?, ?)', 
    [name, price, description, category], 
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product added.', id: result.insertId });
    });
});

app.put('/api/products/:id', (req, res) => {
    const { name, price, description, category } = req.body;
    const { id } = req.params;
    db.query('UPDATE products SET name=?, price=?, description=?, category=? WHERE id=?', 
    [name, price, description, category, id], 
    (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product updated.' });
    });
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id=?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Product deleted.' });
    });
});

// Route to fetch categories
app.get('/api/categories', (req, res) => {
    const query = 'SELECT DISTINCT category FROM products';

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to fetch categories' });
        }
        res.json(result);
    });
});

// Serve static files from the 'build' folder (React app)
if (process.env.NODE_ENV === 'production') {
    // Serve React app build folder
    app.use(express.static(path.join(__dirname, 'build')));

    // Serve React index.html for any non-API route (for React Router)
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
