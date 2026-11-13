const mysql = require('mysql2/promise');

async function addUser(name, email) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 5000,
    user: 'root',
    password: 'ams123',
    database: 'amsDB',
  });

  try {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const [result] = await connection.execute(sql, [name, email]);
    console.log(`User added with ID: ${result.insertId}`);
  } finally {
    await connection.end();
  }
}

const name = process.argv[2] || 'Jane Doe';
const email = process.argv[3] || 'jane@example.com';

addUser(name, email).catch(console.error);
