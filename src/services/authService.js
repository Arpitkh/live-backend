import bcrypt from 'bcrypt';
import client from '../config/db.js';

export async function loginUser({ email, password }) {
  try {
    const query = 'SELECT password, username FROM users WHERE email = ?';
    const result = await client.execute(query, [email], { prepare: true });

    if (result.rowLength === 0) {
      return { success: false, message: 'User not found' };
    }

    const user = result.first();
    const storedHashedPassword = user.password;
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid password' };
    }

    return { success: true, message: `Welcome back, ${user.username}!` };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
}

export async function signupUser({ email, password, username }) {
  try {
    const checkQuery = 'SELECT email FROM users WHERE email = ?';
    const checkResult = await client.execute(checkQuery, [email], { prepare: true });

    if (checkResult.rowLength > 0) {
        return { success: false, message: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)';
    await client.execute(query, [email, username, hashedPassword], { prepare: true });
    return { success: true, message: 'User created successfully' };
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}
