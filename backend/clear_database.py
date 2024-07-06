import sqlite3

def clear_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('DELETE FROM journal_entries')
    c.execute('DELETE FROM users')
    conn.commit()
    conn.close()

if __name__ == "__main__":
    clear_db()
    print("All records cleared from the database.")
