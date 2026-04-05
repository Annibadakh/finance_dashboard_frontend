import { createContext, useContext, useEffect, useState } from "react";

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

let dummyData = [
  {
    id: "1",
    description: "TechCorp Salary",
    amount: 431600,
    category: "Salary",
    type: "income",
    date: new Date(now - 2 * day),
  },
  {
    id: "2",
    description: "Freelance Website",
    amount: 99600,
    category: "Freelance",
    type: "income",
    date: new Date(now - 5 * day),
  },
  {
    id: "3",
    description: "Stock Dividend",
    amount: 24900,
    category: "Investment",
    type: "income",
    date: new Date(now - 15 * day),
  },
  {
    id: "4",
    description: "House Rent",
    amount: 124500,
    category: "Rent",
    type: "expense",
    date: new Date(now - 3 * day),
  },
  {
    id: "5",
    description: "Swiggy Order",
    amount: 20750,
    category: "Food",
    type: "expense",
    date: new Date(now - 1 * day),
  },
  {
    id: "6",
    description: "Uber Ride",
    amount: 9960,
    category: "Transport",
    type: "expense",
    date: new Date(now - 4 * day),
  },
  {
    id: "7",
    description: "AWS Hosting",
    amount: 14940,
    category: "Software",
    type: "expense",
    date: new Date(now - 6 * day),
  },
  {
    id: "8",
    description: "Netflix Subscription",
    amount: 1245,
    category: "Entertainment",
    type: "expense",
    date: new Date(now - 10 * day),
  },
  {
    id: "9",
    description: "Electricity Bill",
    amount: 18260,
    category: "Utilities",
    type: "expense",
    date: new Date(now - 12 * day),
  },
  {
    id: "14",
    description: "Client Payment",
    amount: 166000,
    category: "Freelance",
    type: "income",
    date: new Date(now - 0.5 * day),
  },
  {
    id: "15",
    description: "Coffee",
    amount: 4150,
    category: "Food",
    type: "expense",
    date: new Date(now - 0.2 * day),
  },
];

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(dummyData);

  // ✅ GET ALL
  const getAll = () => transactions;

  // ✅ SET ALL
  const setAll = (data) => {
    setTransactions(data);
  };

  // ✅ ADD
  const add = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  // ✅ UPDATE
  const update = (id, updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  };

  // ✅ DELETE
  const remove = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        getAll,
        setAll,
        add,
        update,
        remove,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
