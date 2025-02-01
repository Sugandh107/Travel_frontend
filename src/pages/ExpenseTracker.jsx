// src/components/ExpenseTracker.js
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import useUserData from "../hooks/useUserData";
import { AuthContext } from "../context/AuthProvider";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const { userData } = useUserData(user?.email);
  const [userId, setUserId] = useState(userData?._id);

  // Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/expense/${userData?._id}`
        );
        setExpenses(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    setUserId(userData?._id);
    fetchExpenses();
  }, [userData]);

  // Handle adding a new expense
  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!name || !amount || !category || !date) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/expense/add", {
        userId,
        name,
        amount,
        category,
        date,
      });

      setExpenses([response.data.expense, ...expenses]);
      setName("");
      setAmount("");
      setCategory("");
      setDate("");
      setError("");
    } catch (err) {
      setError("Error adding expense");
      console.error("Error adding expense:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-600 mb-6">
        Expense Tracker
      </h2>

      {/* Add Expense Form */}
      <form
        onSubmit={handleAddExpense}
        className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md animate-fade-in-down"
      >
        {error && (
          <div className="text-red-500 mb-4 p-2 bg-red-100 rounded">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Expense Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-blue-400"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-all duration-300"
        >
          Add Expense
        </button>
      </form>

      {/* Display Expenses */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Your Expenses</h3>
        {Array.isArray(expenses) && expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li
                key={expense._id}
                className="p-4 border border-gray-200 rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-blue-700">
                  {expense.name}
                </h4>
                <p className="text-gray-700">
                  <strong>Amount:</strong> ${expense.amount}
                </p>
                <p className="text-gray-700">
                  <strong>Category:</strong> {expense.category}
                </p>
                <p className="text-gray-500">
                  <strong>Date:</strong>{" "}
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-500 text-center py-6">
            No expenses yet. Add your first expense above!
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;
