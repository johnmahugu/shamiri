import sqlite3
import bcrypt
import jwt
from bottle import Bottle, run, request, response

# Initialize Bottle app
app = Bottle()

# Database initialization
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS journal_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    ''')
    conn.commit()
    conn.close()

# Utility functions
SECRET_KEY = 'your_secret_key'

def generate_token(user_id):
    payload = {'user_id': user_id}
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def require_auth(f):
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                token = auth_header.split(' ')[1]
                payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                user_id = payload['user_id']
                return f(user_id, *args, **kwargs)
            except jwt.ExpiredSignatureError:
                response.status = 401
                return {'message': 'Token expired'}
            except jwt.InvalidTokenError:
                response.status = 401
                return {'message': 'Invalid token'}
        else:
            response.status = 401
            return {'message': 'Token required'}
    return decorated

# Routes for authentication
@app.post('/auth/register')
def register():
    data = request.json
    username = data['username']
    email = data['email']
    password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    try:
        c.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', (username, email, password))
        conn.commit()
        return {'message': 'User registered successfully'}
    except sqlite3.IntegrityError:
        response.status = 400
        return {'message': 'Username or email already exists'}
    finally:
        conn.close()

@app.post('/auth/token')
def login():
    data = request.json
    username = data['username']
    password = data['password']
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT id, password FROM users WHERE username = ?', (username,))
    user = c.fetchone()
    conn.close()
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user[1]):
        token = generate_token(user[0])
        return {'access_token': token}
    else:
        response.status = 401
        return {'message': 'Invalid credentials'}

# Routes for journal entry management
@app.post('/journal')
@require_auth
def create_entry(user_id):
    data = request.json
    title = data['title']
    content = data['content']
    category = data['category']
    date = data['date']
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('INSERT INTO journal_entries (user_id, title, content, category, date) VALUES (?, ?, ?, ?, ?)',
              (user_id, title, content, category, date))
    conn.commit()
    conn.close()
    return {'message': 'Journal entry created successfully'}

@app.get('/journal')
@require_auth
def get_entries(user_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('SELECT id, title, content, category, date FROM journal_entries WHERE user_id = ?', (user_id,))
    entries = c.fetchall()
    conn.close()
    return {'entries': [{'id': e[0], 'title': e[1], 'content': e[2], 'category': e[3], 'date': e[4]} for e in entries]}

@app.put('/journal/<entry_id>')
@require_auth
def update_entry(user_id, entry_id):
    data = request.json
    title = data['title']
    content = data['content']
    category = data['category']
    
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('UPDATE journal_entries SET title = ?, content = ?, category = ? WHERE id = ? AND user_id = ?',
              (title, content, category, entry_id, user_id))
    conn.commit()
    conn.close()
    return {'message': 'Journal entry updated successfully'}

@app.delete('/journal/<entry_id>')
@require_auth
def delete_entry(user_id, entry_id):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('DELETE FROM journal_entries WHERE id = ? AND user_id = ?', (entry_id, user_id))
    conn.commit()
    conn.close()
    return {'message': 'Journal entry deleted successfully'}

# Route for data summary
@app.get('/summary/<period>')
@require_auth
def get_summary(user_id, period):
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    if period == 'daily':
        c.execute('''
            SELECT category, COUNT(*) as count 
            FROM journal_entries 
            WHERE user_id = ? AND date >= DATE('now', '-1 day') 
            GROUP BY category
        ''', (user_id,))
    elif period == 'weekly':
        c.execute('''
            SELECT category, COUNT(*) as count 
            FROM journal_entries 
            WHERE user_id = ? AND date >= DATE('now', '-7 day') 
            GROUP BY category
        ''', (user_id,))
    elif period == 'monthly':
        c.execute('''
            SELECT category, COUNT(*) as count 
            FROM journal_entries 
            WHERE user_id = ? AND date >= DATE('now', '-1 month') 
            GROUP BY category
        ''', (user_id,))
    summary = c.fetchall()
    conn.close()
    return {'summary': [{'category': s[0], 'count': s[1]} for s in summary]}

# Main function to run the application
if __name__ == "__main__":
    init_db()
    run(app, host='localhost', port=4375, debug=True)
