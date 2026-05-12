
const express = require('express');
const router = express.Router();
const uuid = require('uuid');

// POST /login: Authenticate user and return a UUID
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (email === 'usuario@esoft.com' && password === 'Abc123') {
        // Return a UUID if credentials are correct
        res.status(200).json({ token: uuid.v4() });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
