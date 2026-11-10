
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('./public'));

// JWT secret
// For this assignment, use an environment variable or demo fallback.
const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

// Users with hashed passwords
const users = [
    {
        id: 1,
        email: 'asha@campus.edu',
        role: 'customer',
        hash: bcrypt.hashSync('customer123', 10)
    },
    {
        id: 2,
        email: 'mealhub@campus.edu',
        role: 'restaurant',
        hash: bcrypt.hashSync('resto123', 10)
    }
];

// Food catalogue
let items = [
    { id: 1, name: 'Veg Thali', price: 90 },
    { id: 2, name: 'Paneer Roll', price: 70 }
];

let nextId = 3;


// PART 1: LOGIN ROUTE
app.post('/login', (req, res) => {

    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user || typeof password !== 'string' ||
        !bcrypt.compareSync(password, user.hash)) {
        return res.status(401).json({
            error: 'bad login'
        });
    }

    const token = jwt.sign(
        {
            sub: user.id,
            role: user.role
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    );

    res.json({ token });
});


// PART 2: AUTHENTICATION MIDDLEWARE
function auth(req, res, next) {

    const header = req.get('Authorization') || '';

    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            error: 'invalid or missing token'
        });
    }

    try {
        req.user = jwt.verify(token, SECRET);
        next();
    }
    catch {
        return res.status(401).json({
            error: 'invalid or missing token'
        });
    }
}


// PART 3: AUTHORIZATION MIDDLEWARE
function requireRole(...allowed) {

    return (req, res, next) => {

        if (allowed.includes(req.user.role)) {
            return next();
        }

        return res.status(403).json({
            error: 'forbidden'
        });
    };
}


// PART 4: GET ALL ITEMS
// Any authenticated user can read the menu.
app.get('/items', auth, (req, res) => {
    res.json(items);
});


// PART 5: GET ITEM BY ID
// Any authenticated user can read an individual item.
app.get('/items/:id', auth, (req, res) => {

    const item = items.find(
        i => i.id === Number(req.params.id)
    );

    if (!item) {
        return res.status(404).json({
            error: 'not found'
        });
    }

    res.json(item);
});


// PART 6: POST ITEM
// Only restaurant or admin can add items.
app.post('/items', auth, requireRole('restaurant', 'admin'), (req, res) => {

    const { name, price } = req.body;

    if (typeof name !== 'string' || !name.trim()) {
        return res.status(422).json({
            error: 'name required'
        });
    }

    const numericPrice = Number(price);

    if (price === undefined || !Number.isFinite(numericPrice) || numericPrice < 0) {
        return res.status(422).json({
            error: 'valid price required'
        });
    }

    const item = {
        id: nextId++,
        name: name.trim(),
        price: numericPrice
    };

    items.push(item);

    res.status(201).json(item);
});


// START SERVER
app.listen(PORT, () => {
    console.log(`Secured Catalogue on http://localhost:${PORT}`);
});
