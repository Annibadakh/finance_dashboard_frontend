import { createContext, useContext, useState } from "react";

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

let dummyData = [
  // APRIL (Recent)
  {
    id: "1",
    description: "TechCorp Salary",
    amount: 482248,
    category: "Salary",
    type: "income",
    date: new Date(now - 2 * day),
  },
  {
    id: "2",
    description: "Freelance Website",
    amount: 111288,
    category: "Freelance",
    type: "income",
    date: new Date(now - 5 * day),
  },
  {
    id: "3",
    description: "Stock Dividend",
    amount: 27822,
    category: "Investment",
    type: "income",
    date: new Date(now - 15 * day),
  },
  {
    id: "4",
    description: "House Rent",
    amount: 139110,
    category: "Rent",
    type: "expense",
    date: new Date(now - 3 * day),
  },
  {
    id: "5",
    description: "Swiggy Order",
    amount: 23185,
    category: "Food",
    type: "expense",
    date: new Date(now - 1 * day),
  },
  {
    id: "6",
    description: "Uber Ride",
    amount: 11128.8,
    category: "Transport",
    type: "expense",
    date: new Date(now - 4 * day),
  },
  {
    id: "7",
    description: "AWS Hosting",
    amount: 16693.2,
    category: "Software",
    type: "expense",
    date: new Date(now - 6 * day),
  },
  {
    id: "8",
    description: "Netflix Subscription",
    amount: 1391.1,
    category: "Entertainment",
    type: "expense",
    date: new Date(now - 10 * day),
  },
  {
    id: "9",
    description: "Electricity Bill",
    amount: 20402.8,
    category: "Utilities",
    type: "expense",
    date: new Date(now - 12 * day),
  },
  {
    id: "14",
    description: "Client Payment",
    amount: 185480,
    category: "Freelance",
    type: "income",
    date: new Date(now - 0.5 * day),
  },
  {
    id: "15",
    description: "Coffee",
    amount: 4637,
    category: "Food",
    type: "expense",
    date: new Date(now - 0.2 * day),
  },

  // MARCH (~30–60 days ago)
  {
    id: "16",
    description: "March Salary",
    amount: 472974,
    category: "Salary",
    type: "income",
    date: new Date(now - 35 * day),
  },
  {
    id: "17",
    description: "Client App Payment",
    amount: 166932,
    category: "Freelance",
    type: "income",
    date: new Date(now - 40 * day),
  },
  {
    id: "18",
    description: "Groceries",
    amount: 55644,
    category: "Food",
    type: "expense",
    date: new Date(now - 32 * day),
  },
  {
    id: "19",
    description: "Internet Bill",
    amount: 9274,
    category: "Utilities",
    type: "expense",
    date: new Date(now - 38 * day),
  },
  {
    id: "20",
    description: "Bike Fuel",
    amount: 27822,
    category: "Transport",
    type: "expense",
    date: new Date(now - 45 * day),
  },
  {
    id: "21",
    description: "Zomato Dinner",
    amount: 37096,
    category: "Food",
    type: "expense",
    date: new Date(now - 50 * day),
  },
  {
    id: "22",
    description: "Mutual Fund SIP",
    amount: 92740,
    category: "Investment",
    type: "expense",
    date: new Date(now - 55 * day),
  },

  // FEBRUARY (~60–90 days ago)
  {
    id: "23",
    description: "February Salary",
    amount: 463700,
    category: "Salary",
    type: "income",
    date: new Date(now - 65 * day),
  },
  {
    id: "24",
    description: "Landing Page Project",
    amount: 139110,
    category: "Freelance",
    type: "income",
    date: new Date(now - 70 * day),
  },
  {
    id: "25",
    description: "Electricity Bill",
    amount: 18548,
    category: "Utilities",
    type: "expense",
    date: new Date(now - 68 * day),
  },
  {
    id: "26",
    description: "Gym Renewal",
    amount: 11128.8,
    category: "Health",
    type: "expense",
    date: new Date(now - 75 * day),
  },
  {
    id: "27",
    description: "Amazon Shopping",
    amount: 74192,
    category: "Shopping",
    type: "expense",
    date: new Date(now - 80 * day),
  },
  {
    id: "28",
    description: "Train Tickets",
    amount: 41733,
    category: "Travel",
    type: "expense",
    date: new Date(now - 85 * day),
  },

  // JANUARY (~90–120 days ago)
  {
    id: "29",
    description: "January Salary",
    amount: 445152,
    category: "Salary",
    type: "income",
    date: new Date(now - 95 * day),
  },
  {
    id: "30",
    description: "Portfolio Website Client",
    amount: 185480,
    category: "Freelance",
    type: "income",
    date: new Date(now - 100 * day),
  },
  {
    id: "31",
    description: "New Year Party",
    amount: 64918,
    category: "Entertainment",
    type: "expense",
    date: new Date(now - 98 * day),
  },
  {
    id: "32",
    description: "Laptop Accessories",
    amount: 111288,
    category: "Electronics",
    type: "expense",
    date: new Date(now - 105 * day),
  },
  {
    id: "33",
    description: "Electric Bill",
    amount: 16693.2,
    category: "Utilities",
    type: "expense",
    date: new Date(now - 110 * day),
  },
  {
    id: "34",
    description: "Flight Booking",
    amount: 324590,
    category: "Travel",
    type: "expense",
    date: new Date(now - 115 * day),
  },
];

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(dummyData);

  // GET ALL
  const getAll = () => transactions;

  // SET ALL
  const setAll = (data) => {
    setTransactions(data);
  };

  // ADD
  const add = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  // UPDATE
  const update = (id, updated) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updated } : t)),
    );
  };

  // DELETE
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
