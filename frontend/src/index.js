import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API = 'https://your-backend-url/api';

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
    const res = await axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  }

  async function addExpense() {
    await axios.post(
      `${API}/expense/${selectedCat._id}`,
      { amount, note },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchUser();
    setAmount('');
    setNote('');
  }

  if (!token) return <Login setToken={setToken} />;
  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontSize: '14px' }}>
      <h1>Hello, {user.email}</h1>
      <div>
        {user.categories.map((cat) => {
          const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
          const left = cat.limit - spent;
          const percent = (spent / cat.limit) * 100;
          return (
            <div key={cat._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  {cat.icon} {cat.name}
                </span>
                <span>₹{left} left</span>
              </div>
              {percent >= 100 && <p style={{ color: 'red' }}>Budget exceeded!</p>}
              {percent >= 80 && percent < 100 && <p style={{ color: 'orange' }}>80% used</p>}
              <button onClick={() => setSelectedCat(cat)} style={{ marginTop: '10px' }}>Add Expense</button>
            </div>
          );
        })}
      </div>

      {selectedCat && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: '20px', borderTop: '1px solid #ccc' }}>
          <h2>Add Expense to {selectedCat.name}</h2>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
          />
          <button onClick={addExpense}>Save</button>
        </div>
      )}
    </div>
  );
}

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    const res = await axios.post(`${API}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  }

  return (
    <div style={{ padding: '20px' }}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default App;