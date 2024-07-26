const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../server');

async function registerUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
    [username, email, hashedPassword]
  );
  return result.rows[0].id;
}

async function authenticateUser(email, password) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  }
  throw new Error('Invalid credentials');
}

module.exports = { registerUser, authenticateUser };
