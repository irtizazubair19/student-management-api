const bcrypt = require('bcrypt')
const pool = require('../config/db')

async function register(req, res) {
    const { username, password } = req.body;
    try {
        const hashedpassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedpassword]
        );

        res.status(201).json({message: 'User registered successfully', user: result.rows[0] });
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows[0] == null) {
            return res.status(401).json({message: 'Invalid credentials' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch == false) {
            return res.status(401).json({message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

module.exports = { register, login };