const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Initialize the database
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    // Sample users
    const users = [
        { username: 'user1', email: 'user1@example.com', password: 'password1' },
        { username: 'user2', email: 'user2@example.com', password: 'password2' },
        { username: 'user3', email: 'user3@example.com', password: 'password3' },
    ];

    // Hash passwords and insert users
    users.forEach(user => {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        db.run(`
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `, [user.username, user.email, hashedPassword]);
    });

    // Sample journal entries
    const entries = [
        { user_id: 1, title: 'First Entry', content: 'This is the first entry', category: 'Personal', date: '2024-07-01' },
        { user_id: 1, title: 'Second Entry', content: 'This is the second entry', category: 'Work', date: '2024-07-02' },
        { user_id: 2, title: 'Third Entry', content: 'This is the third entry', category: 'Travel', date: '2024-07-03' },
    ];

    // Insert journal entries
    entries.forEach(entry => {
        db.run(`
            INSERT INTO journal_entries (user_id, title, content, category, date)
            VALUES (?, ?, ?, ?, ?)
        `, [entry.user_id, entry.title, entry.content, entry.category, entry.date]);
    });
});

db.close();
console.log('Database populated with sample data.');
