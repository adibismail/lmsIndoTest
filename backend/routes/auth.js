const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    await pool.query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);
    
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (id, username, email, password_hash, role) VALUES (gen_random_uuid(), $1, $2, $3, $4) RETURNING id, username, role',
      [username, email, hashedPassword, 'user']
    );
    
    res.json({ user: result.rows[0] });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

module.exports = router;