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
// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'https://expensetracker-zm3t.onrender.com/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState({ name: '', limit: '', icon: '' });
  const [selectedCat, setSelectedCat] = useState(null);
  const [expense, setExpense] = useState({ amount: '', note: '' });
  const [viewMode, setViewMode] = useState('grid');
  const [editingCatId, setEditingCatId] = useState(null);
  const [editCatData, setEditCatData] = useState({ name: '', icon: '', limit: '' });

  useEffect(() => {
    if (token) fetchUser();
  }, [token]);

  async function fetchUser() {
    const res = await axios.get(`${API}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  }

  async function login() {
    const res = await axios.post(`${API}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  }

  async function register() {
    await axios.post(`${API}/register`, { email, password });
    login();
  }

  async function addCategory() {
    await axios.post(
      `${API}/category`,
      category,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCategory({ name: '', limit: '', icon: '' });
    fetchUser();
  }

  async function addExpense() {
    await axios.post(
      `${API}/expense/${selectedCat._id}`,
      expense,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setExpense({ amount: '', note: '' });
    fetchUser();
    setViewMode('grid');
  }

  async function deleteCategory(id) {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    await axios.delete(`${API}/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUser();
  }

  async function updateCategory(id) {
    await axios.put(`${API}/category/${id}`, editCatData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditingCatId(null);
    setEditCatData({ name: '', icon: '', limit: '' });
    fetchUser();
  }

  if (!token)
    return (
      <div className="container p-4">
        <h2 className="mb-3">Login</h2>
        <input type="email" placeholder="Email" className="form-control mb-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="form-control mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary me-2" onClick={login}>Login</button>
        <button className="btn btn-secondary" onClick={register}>Register</button>
      </div>
    );

  return (
    <div className="container py-4">
      {viewMode === 'grid' && (
        <>
          <h4 className="mb-3">Your Categories</h4>
          <div className="row g-3 mb-4">
            {user?.categories?.map((cat) => (
              <div className="col-6 col-sm-4 col-md-3" key={cat._id}>
                <div
                  className="card text-center position-relative"
                  style={{ backgroundColor: '#d3eafd', borderRadius: '15px', minHeight: '110px' }}
                >
                  <div
                    className="card-body d-flex flex-column justify-content-center"
                    onClick={() => {
                      setSelectedCat(cat);
                      setViewMode('detail');
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <h6 className="card-title">{cat.icon} {cat.name}</h6>
                    <p className="card-text">Left: ₹{cat.limit - cat.expenses.reduce((sum, e) => sum + e.amount, 0)}</p>
                  </div>
                  <div className="position-absolute top-0 end-0 mt-1 me-2">
                    <button className="btn btn-sm btn-outline-dark me-1" onClick={(e) => { e.stopPropagation(); setEditingCatId(cat._id); setEditCatData({ name: cat.name, icon: cat.icon, limit: cat.limit }); }}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={(e) => { e.stopPropagation(); deleteCategory(cat._id); }}>🗑️</button>
                  </div>
                </div>
                {editingCatId === cat._id && (
                  <div className="card card-body mt-2 p-2">
                    <input type="text" className="form-control mb-1" placeholder="Name" value={editCatData.name} onChange={e => setEditCatData({ ...editCatData, name: e.target.value })} />
                    <input type="text" className="form-control mb-1" placeholder="Icon" value={editCatData.icon} onChange={e => setEditCatData({ ...editCatData, icon: e.target.value })} />
                    <input type="number" className="form-control mb-2" placeholder="Limit" value={editCatData.limit} onChange={e => setEditCatData({ ...editCatData, limit: e.target.value })} />
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-success btn-sm" onClick={() => updateCategory(cat._id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={() => setEditingCatId(null)}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <h5 className="mb-2">Add Category</h5>
          <div className="row g-2 mb-4">
            <div className="col">
              <input type="text" className="form-control" placeholder="Name" value={category.name} onChange={(e) => setCategory({ ...category, name: e.target.value })} />
            </div>
            <div className="col">
              <input type="text" className="form-control" placeholder="Icon" value={category.icon} onChange={(e) => setCategory({ ...category, icon: e.target.value })} />
            </div>
            <div className="col">
              <input type="number" className="form-control" placeholder="Limit" value={category.limit} onChange={(e) => setCategory({ ...category, limit: e.target.value })} />
            </div>
            <div className="col-auto">
              <button className="btn btn-primary" onClick={addCategory}>Add</button>
            </div>
          </div>
        </>
      )}

      {viewMode === 'detail' && selectedCat && (
        <>
          <h4 className="mb-3">{selectedCat.icon} {selectedCat.name}</h4>
          <ul className="list-group mb-3">
            {selectedCat.expenses.map((e, i) => (
              <li className="list-group-item d-flex justify-content-between" key={i}>
                <span>{e.note}</span>
                <span>₹{e.amount}</span>
              </li>
            ))}
          </ul>
          <input type="number" className="form-control mb-2" placeholder="Amount" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} />
          <input type="text" className="form-control mb-3" placeholder="Note" value={expense.note} onChange={(e) => setExpense({ ...expense, note: e.target.value })} />
          <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={addExpense}>Save</button>
            <button className="btn btn-secondary" onClick={() => setViewMode('grid')}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
