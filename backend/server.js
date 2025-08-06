const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const User = require('./models/User');
const authMiddleware = require('./middleware/auth');

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, passwordHash: hash });
  await user.save();
  res.json({ message: 'Registered successfully' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

app.get('/api/user', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user);
});

app.post('/api/category', authMiddleware, async (req, res) => {
  const { name, limit, icon } = req.body;
  const user = await User.findById(req.userId);
  user.categories.push({ name, limit, icon });
  await user.save();
  res.json(user.categories);
});

app.post('/api/expense/:categoryId', authMiddleware, async (req, res) => {
  const { amount, note } = req.body;
  const user = await User.findById(req.userId);
  const category = user.categories.id(req.params.categoryId);
  category.expenses.push({ amount, note, date: new Date() });
  await user.save();
  res.json(category);
});

app.delete('/api/expense/:categoryId/:expenseId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  const category = user.categories.id(req.params.categoryId);
  category.expenses.id(req.params.expenseId).remove();
  await user.save();
  res.json(category);
});

// Monthly reset
const cron = require('node-cron');
cron.schedule('0 0 * * *', async () => {
  const users = await User.find();
  for (let user of users) {
    for (let category of user.categories) {
      category.expenses = category.expenses.filter(exp => {
        const date = new Date(exp.date);
        return date.getMonth() === new Date().getMonth();
      });
    }
    await user.save();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
