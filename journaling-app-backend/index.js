const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key';

const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Initialize database and create tables
db.serialize(() => {
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
});

// Root URL route
app.get('/', (req, res) => {
    res.send('Welcome to the Shamiri Health Journaling App API');
});

// Routes for authentication
app.post('/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const stmt = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
    stmt.run(username, email, hashedPassword, function(err) {
        if (err) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        res.json({ message: 'User registered successfully' });
    });
    stmt.finalize();
});

app.post('/auth/token', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT id, password FROM users WHERE username = ?', [username], (err, row) => {
        if (err || !row || !bcrypt.compareSync(password, row.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(row.id);
        res.json({ access_token: token });
    });
});

// Routes for journal entry management
app.post('/journal', authMiddleware, (req, res) => {
    const { title, content, category, date } = req.body;
    const userId = req.user.userId;

    const stmt = db.prepare('INSERT INTO journal_entries (user_id, title, content, category, date) VALUES (?, ?, ?, ?, ?)');
    stmt.run(userId, title, content, category, date, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to create journal entry' });
        }
        res.json({ message: 'Journal entry created successfully' });
    });
    stmt.finalize();
});

app.get('/journal', authMiddleware, (req, res) => {
    const userId = req.user.userId;

    db.all('SELECT id, title, content, category, date FROM journal_entries WHERE user_id = ?', [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve journal entries' });
        }
        res.json({ entries: rows });
    });
});

app.put('/journal/:id', authMiddleware, (req, res) => {
    const { title, content, category } = req.body;
    const userId = req.user.userId;
    const entryId = req.params.id;

    const stmt = db.prepare('UPDATE journal_entries SET title = ?, content = ?, category = ? WHERE id = ? AND user_id = ?');
    stmt.run(title, content, category, entryId, userId, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to update journal entry' });
        }
        res.json({ message: 'Journal entry updated successfully' });
    });
    stmt.finalize();
});

app.delete('/journal/:id', authMiddleware, (req, res) => {
    const userId = req.user.userId;
    const entryId = req.params.id;

    const stmt = db.prepare('DELETE FROM journal_entries WHERE id = ? AND user_id = ?');
    stmt.run(entryId, userId, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to delete journal entry' });
        }
        res.json({ message: 'Journal entry deleted successfully' });
    });
    stmt.finalize();
});

// Route for data summary
app.get('/summary/:period', authMiddleware, (req, res) => {
    const userId = req.user.userId;
    const period = req.params.period;
    let query;

    if (period === 'daily') {
        query = 'SELECT category, COUNT(*) as count FROM journal_entries WHERE user_id = ? AND date >= DATE("now", "-1 day") GROUP BY category';
    } else if (period === 'weekly') {
        query = 'SELECT category, COUNT(*) as count FROM journal_entries WHERE user_id = ? AND date >= DATE("now", "-7 day") GROUP BY category';
    } else if (period === 'monthly') {
        query = 'SELECT category, COUNT(*) as count FROM journal_entries WHERE user_id = ? AND date >= DATE("now", "-1 month") GROUP BY category';
    }

    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve summary' });
        }
        res.json({ summary: rows });
    });
});

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
