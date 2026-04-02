import React from "react";
import { FiArrowUpRight, FiArrowDownLeft, FiMoreHorizontal, FiCreditCard, FiSend } from "react-icons/fi";

const DummyDashboard = () => {
  const transactions = [
    { id: 1, name: "Apple Store", date: "Today, 14:30", amount: "-$999.00", type: "expense" },
    { id: 2, name: "Upwork Escrow", date: "Yesterday, 09:15", amount: "+$3,250.00", type: "income" },
    { id: 3, name: "Uber Ride", date: "Oct 24, 18:45", amount: "-$24.50", type: "expense" },
    { id: 4, name: "Netflix Sub", date: "Oct 23, 10:00", amount: "-$15.99", type: "expense" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, track your finances easily.</p>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Balance Card */}
        <div className="col-span-1 md:col-span-2 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-blue-100 font-medium mb-1">Total Balance</p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">$42,850.00</h2>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <FiCreditCard size={24} />
            </div>
          </div>
          <div className="relative z-10 mt-8 flex gap-4">
            <button className="flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm">
              <FiSend /> Send
            </button>
            <button className="flex items-center gap-2 bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-white/30 backdrop-blur-sm transition-colors border border-white/10">
              <FiArrowDownLeft /> Receive
            </button>
          </div>
        </div>

        {/* Quick Stat Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <FiArrowUpRight size={20} />
            </div>
            <span className="text-sm font-medium text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-full">+12.5%</span>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">Monthly Income</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">$8,450.00</h3>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-2xl transition-colors group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  tx.type === 'income' 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                }`}>
                  {tx.type === 'income' ? <FiArrowDownLeft size={20} /> : <FiArrowUpRight size={20} />}
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-semibold">{tx.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{tx.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-bold ${
                  tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'
                }`}>
                  {tx.amount}
                </span>
                <button className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-600 dark:hover:text-gray-200">
                  <FiMoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DummyDashboard;