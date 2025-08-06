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
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const API = 'https://expensetracker-zm3t.onrender.com/api';

// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));
//   const [user, setUser] = useState(null);
//   const [amount, setAmount] = useState('');
//   const [note, setNote] = useState('');
//   const [selectedCat, setSelectedCat] = useState(null);

//   useEffect(() => {
//     if (token) fetchUser();
//   }, [token]);

//   async function fetchUser() {
//     try {
//       const res = await axios.get(`${API}/user`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function addExpense() {
//     try {
//       await axios.post(`${API}/expense/${selectedCat._id}`, { amount, note }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       fetchUser();
//       setAmount('');
//       setNote('');
//       setSelectedCat(null);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   if (!token) return <Login setToken={setToken} />;
//   if (!user) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className="p-4 max-w-md mx-auto text-sm font-sans">
//       <h1 className="text-xl font-bold mb-4">Hello, {user.email}</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {user.categories.map(cat => {
//           const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
//           const left = cat.limit - spent;
//           const percent = (spent / cat.limit) * 100;
//           return (
//             <div
//               key={cat._id}
//               className="bg-white rounded-2xl p-4 shadow-md transition-transform transform hover:scale-105"
//               style={{ backgroundColor: percent >= 100 ? '#ffebeb' : percent >= 80 ? '#fff4e5' : '#e6fffa' }}
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <div className="font-semibold text-lg">{cat.icon} {cat.name}</div>
//                 <div className="text-xs text-gray-600">₹{left} left</div>
//               </div>
//               <div className="text-xs">
//                 {percent >= 100 && <span className="text-red-600">Budget exceeded!</span>}
//                 {percent >= 80 && percent < 100 && <span className="text-orange-500">80% used</span>}
//               </div>
//               <button onClick={() => setSelectedCat(cat)} className="mt-2 text-blue-600 underline text-sm">
//                 Add Expense
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {selectedCat && (
//         <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t rounded-t-2xl shadow-lg">
//           <h2 className="text-md font-bold mb-2">Add to {selectedCat.name}</h2>
//           <input
//             type="number"
//             placeholder="Amount"
//             value={amount}
//             onChange={e => setAmount(e.target.value)}
//             className="w-full mb-2 p-2 border rounded-md"
//           />
//           <input
//             placeholder="Note"
//             value={note}
//             onChange={e => setNote(e.target.value)}
//             className="w-full mb-2 p-2 border rounded-md"
//           />
//           <div className="flex justify-between">
//             <button
//               onClick={() => setSelectedCat(null)}
//               className="bg-gray-300 px-4 py-2 rounded-md text-sm"
//             >Cancel</button>
//             <button
//               onClick={addExpense}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
//             >Save</button>
//           </div>
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
//       console.error(err);
//       alert('Login failed');
//     }
//   }

//   return (
//     <div className="p-6 max-w-sm mx-auto">
//       <h1 className="text-xl font-bold mb-4">Login</h1>
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={e => setEmail(e.target.value)}
//         className="w-full mb-3 p-2 border rounded-md"
//       />
//       <input
//         placeholder="Password"
//         type="password"
//         value={password}
//         onChange={e => setPassword(e.target.value)}
//         className="w-full mb-3 p-2 border rounded-md"
//       />
//       <button
//         onClick={login}
//         className="w-full bg-blue-600 text-white py-2 rounded-md"
//       >Login</button>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://expensetracker-zm3t.onrender.com/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedCat, setSelectedCat] = useState(null);
  const [newCat, setNewCat] = useState({ name: '', icon: '', limit: '' });

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
      console.error(err);
    }
  }

  async function addExpense() {
    try {
      await axios.post(`${API}/expense/${selectedCat._id}`, { amount, note }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUser();
      setAmount('');
      setNote('');
      setSelectedCat(null);
    } catch (err) {
      console.error(err);
    }
  }

  async function addCategory() {
    try {
      await axios.post(`${API}/category`, newCat, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCat({ name: '', icon: '', limit: '' });
      fetchUser();
    } catch (err) {
      console.error(err);
    }
  }

  if (!token) return <Login setToken={setToken} />;
  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-fluid p-3" style={{ fontFamily: 'sans-serif' }}>
      {/* Header */}
      <div className="bg-pink text-center py-3 mb-4" style={{ backgroundColor: '#f8c3e0' }}>
        <h5 className="m-0">Hello, {user.email}</h5>
      </div>

      {/* Category Grid */}
      <div className="row g-3 justify-content-center">
        {user.categories.map(cat => {
          const spent = cat.expenses.reduce((sum, e) => sum + e.amount, 0);
          const left = cat.limit - spent;
          const percent = (spent / cat.limit) * 100;

          return (
            <div className="col-5 col-sm-4 col-md-3" key={cat._id}>
              <div
                className="card text-center"
                style={{
                  backgroundColor: '#d3eafd',
                  cursor: 'pointer',
                  borderRadius: '15px'
                }}
                onClick={() => setSelectedCat(cat)}
              >
                <div className="card-body">
                  <h5 className="card-title">{cat.icon} {cat.name}</h5>
                  <p className="card-text">Left: ₹{left}</p>
                  {percent >= 100 && <div className="text-danger">Budget Exceeded!</div>}
                  {percent >= 80 && percent < 100 && <div className="text-warning">80% used</div>}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Category Button */}
        <div className="col-5 col-sm-4 col-md-3">
          <div
            className="card text-center"
            style={{
              backgroundColor: '#ffcbe0',
              cursor: 'pointer',
              borderRadius: '15px'
            }}
            data-bs-toggle="collapse"
            data-bs-target="#addCatForm"
          >
            <div className="card-body">
              <h5 className="card-title">+ Add Category</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Form */}
      <div id="addCatForm" className="collapse mt-4">
        <div className="card card-body border border-primary">
          <h5 className="mb-3">Add New Category</h5>
          <div className="row g-2">
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newCat.name}
                onChange={e => setNewCat({ ...newCat, name: e.target.value })}
              />
            </div>
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                placeholder="Icon (e.g. ✈️)"
                value={newCat.icon}
                onChange={e => setNewCat({ ...newCat, icon: e.target.value })}
              />
            </div>
            <div className="col-4">
              <input
                type="number"
                className="form-control"
                placeholder="Limit"
                value={newCat.limit}
                onChange={e => setNewCat({ ...newCat, limit: e.target.value })}
              />
            </div>
          </div>
          <button className="btn btn-primary mt-3 w-100" onClick={addCategory}>Add Category</button>
        </div>
      </div>

      {/* Expense Modal */}
      {selectedCat && (
        <div className="position-fixed bottom-0 start-0 end-0 bg-light p-3 border-top" style={{ zIndex: 1000 }}>
          <h5 className="text-center mb-3">{selectedCat.name} Expenses</h5>

          <div className="mb-2">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Note"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-success" onClick={addExpense}>Save</button>
              <button className="btn btn-secondary" onClick={() => setSelectedCat(null)}>Close</button>
            </div>
          </div>

          {/* Expenses Table */}
          <table className="table table-bordered table-sm mt-3">
            <thead>
              <tr>
                <th>Note</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {selectedCat.expenses.map((e, idx) => (
                <tr key={idx}>
                  <td>{e.note}</td>
                  <td>₹{e.amount}</td>
                  <td>{new Date(e.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// --- Login Component ---
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
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h4 className="mb-3 text-center">Login</h4>
      <input
        type="email"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary w-100" onClick={login}>Login</button>
    </div>
  );
}

export default App;
