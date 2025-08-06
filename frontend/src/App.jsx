import { useState, useEffect } from 'react';
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
    const res = await axios.get(`${API}/user`, { headers: { Authorization: `Bearer ${token}` } });
    setUser(res.data);
  }

  async function addExpense() {
    await axios.post(`${API}/expense/${selectedCat._id}`, { amount, note }, { headers: { Authorization: `Bearer ${token}` } });
    fetchUser();
    setAmount(''); setNote('');
  }

  if (!token) return <Login setToken={setToken} />;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-4 text-sm">
      <h1 className="text-lg font-bold">Hello, {user.email}</h1>
      <div className="grid gap-4">
        {user.categories.map(cat => {
          const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
          const left = cat.limit - spent;
          const percent = (spent / cat.limit) * 100;
          return (
            <div key={cat._id} className="border rounded p-2">
              <div className="flex justify-between items-center">
                <span>{cat.icon} {cat.name}</span>
                <span>₹{left} left</span>
              </div>
              {percent >= 100 && <p className="text-red-500">Budget exceeded!</p>}
              {percent >= 80 && percent < 100 && <p className="text-yellow-500">80% used</p>}
              <button onClick={() => setSelectedCat(cat)} className="mt-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">Add Expense</button>
            </div>
          );
        })}
      </div>

      {selectedCat && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
          <h2 className="font-bold mb-2">Add Expense to {selectedCat.name}</h2>
          <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="border p-1 w-full mb-1" />
          <input placeholder="Note" value={note} onChange={e => setNote(e.target.value)} className="border p-1 w-full mb-1" />
          <button onClick={addExpense} className="bg-green-500 text-white px-4 py-1 rounded">Save</button>
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
    <div className="p-4">
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-1 w-full mb-2" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-1 w-full mb-2" />
      <button onClick={login} className="bg-blue-600 text-white px-4 py-1 rounded">Login</button>
    </div>
  );
}

export default App;
