import React from "react";
import { FiTrendingUp, FiArrowDownLeft, FiArrowUpRight, FiFilter, FiAlertCircle } from "react-icons/fi";
import { useDashboard } from "./useDashboard";
import Loader from "../../components/Loader";
import StatCard from "./components/StatCard";
import TrendChart from "./components/TrendChart";
import CategoryChart from "./components/CategoryChart";

const View = () => {
  const { data, loading, error, filter, setFilter } = useDashboard();

  if (loading) return <Loader text="Loading Dashboard..." />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header & Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Overview</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track your cashflow and spending patterns.</p>
        </div>
        
        {/* Time Period Filter */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1.5 rounded-xl shadow-sm">
          <FiFilter className="text-gray-400 ml-2" />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-sm font-medium text-gray-700 dark:text-gray-300 outline-none pr-4 py-1 cursor-pointer"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          amount={data.stats.balance} 
          icon={FiTrendingUp} 
          trend={data.stats.growth}
          colorClass="text-blue-600 dark:text-blue-400"
          bgClass="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatCard 
          title="Total Income" 
          amount={data.stats.income} 
          icon={FiArrowDownLeft} 
          colorClass="text-emerald-600 dark:text-emerald-400"
          bgClass="bg-emerald-100 dark:bg-emerald-900/30"
        />
        <StatCard 
          title="Total Expenses" 
          amount={data.stats.expenses} 
          icon={FiArrowUpRight} 
          colorClass="text-rose-600 dark:text-rose-400"
          bgClass="bg-rose-100 dark:bg-rose-900/30"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Chart (Takes up 2 cols on Desktop) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Cashflow Trend</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Income vs Expenses over time</p>
          <TrendChart data={data.trendData} />
        </div>

        {/* Categories Chart & Insights (Takes 1 col) */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Top Expenses</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Breakdown by category</p>
          <CategoryChart data={data.categoryData} />

          {/* Quick Insights Box */}
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <FiAlertCircle className="text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800 dark:text-amber-400">Highest Spending</p>
                <p className="text-xs text-amber-700/80 dark:text-amber-500/80 mt-1">
                  You spent <strong className="font-bold">${data.insights.topCategoryAmount}</strong> on <strong>{data.insights.topCategory}</strong> in this period.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default View;