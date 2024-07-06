const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Database initialization
const db = new sqlite3.Database('database.db');

const initDb = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
};

initDb();

// Utility functions
const generateToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      req.userId = payload.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } else {
    return res.status(401).json({ message: 'Token required' });
  }
};

// Routes for authentication
app.post('/auth/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
    if (err) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    res.json({ message: 'User registered successfully' });
  });
});

app.post('/auth/token', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT id, password FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user.id);
    res.json({ access_token: token });
  });
});

// Routes for journal entry management
app.post('/journal', requireAuth, (req, res) => {
  const { title, content, category, date } = req.body;
  db.run('INSERT INTO journal_entries (user_id, title, content, category, date) VALUES (?, ?, ?, ?, ?)', [req.userId, title, content, category, date], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error creating journal entry' });
    }
    res.json({ message: 'Journal entry created successfully' });
  });
});

app.get('/journal', requireAuth, (req, res) => {
  db.all('SELECT id, title, content, category, date FROM journal_entries WHERE user_id = ?', [req.userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching journal entries' });
    }
    res.json({ entries: rows });
  });
});

app.put('/journal/:entryId', requireAuth, (req, res) => {
  const { entryId } = req.params;
  const { title, content, category } = req.body;
  db.run('UPDATE journal_entries SET title = ?, content = ?, category = ? WHERE id = ? AND user_id = ?', [title, content, category, entryId, req.userId], function(err) {
    if (err || this.changes === 0) {
      return res.status(500).json({ message: 'Error updating journal entry' });
    }
    res.json({ message: 'Journal entry updated successfully' });
  });
});

app.delete('/journal/:entryId', requireAuth, (req, res) => {
  const { entryId } = req.params;
  db.run('DELETE FROM journal_entries WHERE id = ? AND user_id = ?', [entryId, req.userId], function(err) {
    if (err || this.changes === 0) {
      return res.status(500).json({ message: 'Error deleting journal entry' });
    }
    res.json({ message: 'Journal entry deleted successfully' });
  });
});

// Route for data summary
app.get('/summary/:period', requireAuth, (req, res) => {
  const { period } = req.params;
  let query = '';
  switch (period) {
    case 'daily':
      query = 'SELECT category, COUNT(*) as count FROM journal_entries WHERE user_id = ? AND date >= DATE("now", "-1 day") GROUP BY category';
      break;
    case 'weekly':
      query = 'SELECT category, COUNT(*) as count FROM journal_entries WHERE user_id = ? AND date >= DATE("now", "-7 day") GROUP BY category';
      break;
    case 'monthly':
      query = 'SELECT category, COUNT(*) as count FROM journal_entries WHERE user_id = ? AND date >= DATE("now", "-1 month") GROUP BY category';
      break;
    default:
      return res.status(400).json({ message: 'Invalid period' });
  }
  db.all(query, [req.userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching summary data' });
    }
    res.json({ summary: rows });
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
