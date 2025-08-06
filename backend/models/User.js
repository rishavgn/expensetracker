const { Schema, model } = require('mongoose');
const expenseSchema = new Schema({
  amount: Number,
  note: String,
  date: Date
});
const categorySchema = new Schema({
  name: String,
  icon: String,
  limit: Number,
  expenses: [expenseSchema]
});
const userSchema = new Schema({
  email: String,
  passwordHash: String,
  categories: [categorySchema],
  createdAt: { type: Date, default: Date.now }
});
module.exports = model('User', userSchema);
