const sqlite3 = require('sqlite3').verbose();

// Initialize the database
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    // Clear users table
    db.run('DELETE FROM users', (err) => {
        if (err) {
            console.error('Error clearing users table:', err.message);
        } else {
            console.log('Users table cleared.');
        }
    });

    // Clear journal_entries table
    db.run('DELETE FROM journal_entries', (err) => {
        if (err) {
            console.error('Error clearing journal_entries table:', err.message);
        } else {
            console.log('Journal entries table cleared.');
        }
    });
});

db.close();
console.log('Database cleared.');
