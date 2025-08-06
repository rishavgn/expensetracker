// src/App.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://your-backend-url/api'; // Replace with your actual backend URL

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  async function fetchUser() {
    try {
      const res = await axios.get(`${API}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user:', err);
      setToken(null);
      localStorage.removeItem('token');
    }
  }

  async function addExpense() {
    try {
      await axios.post(
        `${API}/expense/${selectedCat._id}`,
        { amount: parseFloat(amount), note },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchUser();
      setAmount('');
      setNote('');
      setSelectedCat(null);
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  }

  if (!token) return <Login setToken={setToken} />;
  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h2>Hello, {user.email}</h2>
      {user.categories.map((cat) => {
        const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
        const left = cat.limit - spent;
        const percent = (spent / cat.limit) * 100;
        return (
          <div
            key={cat._id}
            style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>
                {cat.icon} {cat.name}
              </strong>
              <span>₹{left} left</span>
            </div>
            {percent >= 100 && <p style={{ color: 'red' }}>Budget exceeded!</p>}
            {percent >= 80 && percent < 100 && (
              <p style={{ color: 'orange' }}>80% used</p>
            )}
            <button onClick={() => setSelectedCat(cat)}>Add Expense</button>
          </div>
        );
      })}

      {selectedCat && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#f9f9f9',
            padding: '1rem',
            borderTop: '1px solid #ccc',
          }}
        >
          <h3>Add Expense to {selectedCat.name}</h3>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
          <input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '5px' }}
          />
          <button onClick={addExpense}>Save</button>
          <button onClick={() => setSelectedCat(null)} style={{ marginLeft: '10px' }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;
