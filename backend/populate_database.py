import sqlite3
import bcrypt

def populate_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()

    # Insert sample users
    users = [
        ('john', 'john@example.com', bcrypt.hashpw('john'.encode('utf-8'), bcrypt.gensalt())),
        ('mwirigi', 'mwirigi@example.com', bcrypt.hashpw('mwirigi'.encode('utf-8'), bcrypt.gensalt())),
        ('mahugu', 'mahugu@example.com', bcrypt.hashpw('mahugu'.encode('utf-8'), bcrypt.gensalt()))
    ]
    c.executemany('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', users)

    # Get user IDs
    c.execute('SELECT id FROM users')
    user_ids = [row[0] for row in c.fetchall()]

    # Insert sample journal entries
    journal_entries = [
        (user_ids[0], 'Title 1', 'Content 1', 'Personal', '2023-01-01'),
        (user_ids[0], 'Title 2', 'Content 2', 'Work', '2023-01-02'),
        (user_ids[1], 'Title 3', 'Content 3', 'Travel', '2023-01-03'),
        (user_ids[1], 'Title 4', 'Content 4', 'Personal', '2023-01-04'),
        (user_ids[2], 'Title 5', 'Content 5', 'Work', '2023-01-05'),
        (user_ids[2], 'Title 6', 'Content 6', 'Travel', '2023-01-06')
    ]
    c.executemany('INSERT INTO journal_entries (user_id, title, content, category, date) VALUES (?, ?, ?, ?, ?)', journal_entries)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    populate_db()
    print("Journal Database populated with sample records.")
