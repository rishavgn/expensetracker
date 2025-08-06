// // src/App.jsx
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const API = 'https://expensetracker-zm3t.onrender.com/api';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [note, setNote] = useState('');
//   const [selectedCat, setSelectedCat] = useState(null);
//   const [newCat, setNewCat] = useState({ name: '', icon: '', limit: '' });

//   useEffect(() => {
//     if (token) fetchUser();
//   }, [token]);

//   async function fetchUser() {
//     try {
//       const res = await axios.get(`${API}/user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function addExpense() {
//     try {
//       await axios.post(`${API}/expense/${selectedCat._id}`, { amount, note }, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchUser();
//       setAmount('');
//       setNote('');
//       setSelectedCat(null);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function addCategory() {
//     try {
//       await axios.post(`${API}/category`, newCat, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewCat({ name: '', icon: '', limit: '' });
//       fetchUser();
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   if (!token) return <Login setToken={setToken} />;
//   if (!user) return <div>Loading...</div>;

//   return (
//     <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
//       <h1>Hello, {user.email}</h1>

//       {/* Add New Category */}
//       <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
//         <h2>Add Category</h2>
//         <input placeholder="Name" value={newCat.name} onChange={e => setNewCat({ ...newCat, name: e.target.value })} />
//         <input placeholder="Icon (e.g. 🛒)" value={newCat.icon} onChange={e => setNewCat({ ...newCat, icon: e.target.value })} />
//         <input placeholder="Limit" value={newCat.limit} onChange={e => setNewCat({ ...newCat, limit: e.target.value })} />
//         <button onClick={addCategory}>Add Category</button>
//       </div>

//       {/* Budget Overview & Expense Logging */}
//       {user.categories.map(cat => {
//         const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
//         const left = cat.limit - spent;
//         const percent = (spent / cat.limit) * 100;

//         return (
//           <div key={cat._id} style={{ border: '1px solid #ccc', padding: '0.5rem', marginBottom: '1rem' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//               <span>{cat.icon} {cat.name}</span>
//               <span>₹{left} left</span>
//             </div>
//             {percent >= 100 && <p style={{ color: 'red' }}>Budget exceeded!</p>}
//             {percent >= 80 && percent < 100 && <p style={{ color: 'orange' }}>80% used</p>}
//             <button onClick={() => setSelectedCat(cat)}>Add/View Expenses</button>

//             {/* List past expenses */}
//             {cat.expenses.length > 0 && (
//               <ul style={{ marginTop: '0.5rem' }}>
//                 {cat.expenses.map((e, i) => (
//                   <li key={i}>₹{e.amount} - {e.note}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         );
//       })}

//       {/* Add Expense Modal */}
//       {selectedCat && (
//         <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', padding: '1rem', borderTop: '1px solid #ccc' }}>
//           <h2>Add Expense to {selectedCat.name}</h2>
//           <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
//           <input placeholder="Note" value={note} onChange={e => setNote(e.target.value)} />
//           <button onClick={addExpense}>Save</button>
//           <button onClick={() => setSelectedCat(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// function Login({ setToken }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   async function login() {
//     try {
//       const res = await axios.post(`${API}/login`, { email, password });
//       localStorage.setItem('token', res.data.token);
//       setToken(res.data.token);
//     } catch (err) {
//       alert('Login failed');
//     }
//   }

//   return (
//     <div style={{ padding: '1rem' }}>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://expensetracker-zm3t.onrender.com/api';

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
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser(res.data);
  }

  async function addExpense() {
    await axios.post(`${API}/expense/${selectedCat._id}`, { amount, note }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchUser();
    setAmount('');
    setNote('');
    setSelectedCat(null);
  }

  if (!token) return <Login setToken={setToken} />;
  if (!user) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="p-4 text-sm max-w-md mx-auto font-sans">
      <h1 className="text-xl font-bold mb-4">Hello, {user.email}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {user.categories.map(cat => {
          const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
          const left = cat.limit - spent;
          const percent = (spent / cat.limit) * 100;
          return (
            <div
              key={cat._id}
              className="rounded-2xl shadow-md p-3 bg-gradient-to-tr from-blue-100 to-blue-200 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => setSelectedCat(cat)}
            >
              <div className="flex justify-between items-center">
                <span className="text-lg">{cat.icon} {cat.name}</span>
              </div>
              <div className="text-sm mt-2">₹{left} left</div>
              {percent >= 100 && <p className="text-red-600 text-xs">Budget exceeded!</p>}
              {percent >= 80 && percent < 100 && <p className="text-orange-500 text-xs">80% used</p>}
            </div>
          );
        })}
      </div>

      {selectedCat && (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t shadow-xl rounded-t-2xl transition-all">
          <h2 className="text-lg font-semibold mb-2">Add Expense to {selectedCat.name}</h2>
          <input
            className="border p-2 w-full mb-2 rounded"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <input
            className="border p-2 w-full mb-2 rounded"
            placeholder="Note"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={addExpense}
          >
            Save
          </button>
          <button
            className="text-gray-600 text-xs mt-2 underline w-full"
            onClick={() => setSelectedCat(null)}
          >
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
    const res = await axios.post(`${API}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2 rounded"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}

export default App;

