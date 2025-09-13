const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const productCount = await pool.query('SELECT COUNT(*) FROM products');
    const eventCount = await pool.query('SELECT COUNT(*) FROM analytics WHERE created_at > NOW() - INTERVAL \'24 hours\'');
    
    res.json({
      users: parseInt(userCount.rows[0].count),
      products: parseInt(productCount.rows[0].count),
      todayEvents: parseInt(eventCount.rows[0].count)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/analytics', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT event_type, COUNT(*) as count, DATE(created_at) as date
      FROM analytics 
      WHERE created_at > NOW() - INTERVAL '7 days'
      GROUP BY event_type, DATE(created_at)
      ORDER BY date DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;