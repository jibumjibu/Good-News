from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('counts.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS counts (id INTEGER PRIMARY KEY, count INTEGER)''')
    conn.commit()
    conn.close()

# Home route
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save_count', methods=['POST'])
def save_count():
    count = request.json.get('count')
    conn = sqlite3.connect('counts.db')
    c = conn.cursor()
    c.execute("INSERT INTO counts (count) VALUES (?)", (count,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Count saved successfully!'}), 200

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
