const express = require("express");
const router = express.Router();

const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Replace with a secure secret key

// Authenticate user and generate a JWT token
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check username and password against your database or user store
    // If valid, generate a token
    if (username === 'user' && password === 'password') {
        const token = jwt.sign({ username }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Authentication failed' });
    }
});

// Protected route, only accessible with a valid token
router.get('/profile', (req, res) => {
    const token = req.header('Authorization');

    try {
        const payload = jwt.verify(token, secretKey);
        res.json({ message: 'Welcome to your profile', user: payload.username });
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
});
