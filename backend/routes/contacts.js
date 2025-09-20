const express = require('express');
const router = express.Router();
const db = require('../db');

// tiny promise wrappers
const run = (sql, params=[]) => new Promise((res, rej) =>
  db.run(sql, params, function(err) { if (err) rej(err); else res(this); })
);
const all = (sql, params=[]) => new Promise((res, rej) =>
  db.all(sql, params, (err, rows) => { if (err) rej(err); else res(rows); })
);
const get = (sql, params=[]) => new Promise((res, rej) =>
  db.get(sql, params, (err, row) => { if (err) rej(err); else res(row); })
);

// POST /contacts
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: 'All fields required' });
    const emailRe = /^\S+@\S+\.\S+$/;
    const phoneRe = /^\d{10}$/;
    if (!emailRe.test(email)) return res.status(400).json({ error: 'Invalid email' });
    if (!phoneRe.test(phone)) return res.status(400).json({ error: 'Invalid phone' });

    const result = await run('INSERT INTO contacts (name,email,phone) VALUES (?,?,?)', [name,email,phone]);
    const id = result.lastID;
    const contact = await get('SELECT * FROM contacts WHERE id = ?', [id]);
    res.status(201).json(contact);
  } catch (err) {
    console.error(err); res.status(500).json({ error: 'Server error' });
  }
});

// GET /contacts?page=1&limit=10
router.get('/', async (req, res) => {
    try {
      const page = Math.max(1, parseInt(req.query.page) || 1);
      const limit = Math.max(1, parseInt(req.query.limit) || 10);
      const offset = (page - 1) * limit;
      const q = req.query.q ? `%${req.query.q}%` : null;
  
      let contacts, count;
  
      if (q) {
        contacts = await all(
          'SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?',
          [q, q, limit, offset]
        );
        const result = await get(
          'SELECT COUNT(*) as count FROM contacts WHERE name LIKE ? OR email LIKE ?',
          [q, q]
        );
        count = result.count;
      } else {
        contacts = await all(
          'SELECT * FROM contacts ORDER BY id DESC LIMIT ? OFFSET ?',
          [limit, offset]
        );
        const result = await get('SELECT COUNT(*) as count FROM contacts');
        count = result.count;
      }
  
      res.json({ contacts, total: count });
    } catch (err) { 
      console.error(err); 
      res.status(500).json({ error: 'Server error' }); 
    }
  });

// PUT /contacts/:id
router.put('/:id', async (req, res) => {
    const { name,email,phone } = req.body;
    await run('UPDATE contacts SET name=?,email=?,phone=? WHERE id=?', [name,email,phone, req.params.id]);
    const updated = await get('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    res.json(updated);
  });

// DELETE /contacts/:id
router.delete('/:id', async (req, res) => {
  try {
    await run('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) { console.error(err); res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;