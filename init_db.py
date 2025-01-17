import sqlite3

def init_db():
    """Initialize the database with the necessary table."""
    conn = sqlite3.connect('counts.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS counts (id INTEGER PRIMARY KEY, count INTEGER)''')
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized and table created successfully.")
