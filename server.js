const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const dbConfig = {
  host: 'localhost',
  port: 5000,
  user: 'root',
  password: 'ams123',
  database: 'amsDB',
};

app.post('/add-user', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const [result] = await connection.execute(sql, [name, email]);
    res.json({ insertId: result.insertId });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({ error: 'Database insertion failed.' });
  } finally {
    if (connection) await connection.end();
  }
});

app.get("/getUsers", async (req, res) => {
   let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const sql = 'select * from users';
    const [result] = await connection.execute(sql);
    res.json({ users: result });
  } catch (error) {
    console.error('Database error:', error.message);
    res.status(500).json({ error: 'Database reading failed.' });
  } finally {
    if (connection) await connection.end();
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
