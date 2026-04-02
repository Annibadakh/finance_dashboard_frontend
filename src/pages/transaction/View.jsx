import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FiArrowLeft } from "react-icons/fi";
import { useTransactions } from "./useTransactions";
import Loader from "../../components/Loader";
import Button from "../../components/Button";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleData: data, loading, error } = useTransactions(id);

  if (loading) return <Loader fullScreen text="Loading details..." />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex flex-col items-center text-center pb-8 border-b border-gray-100 dark:border-gray-800 mb-8">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Amount</p>
        <h1 className={`text-4xl font-bold tracking-tight ${data.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
          {data.type === 'income' ? '+' : '-'}${data.amount.toFixed(2)}
        </h1>
        <span className={`mt-4 px-3 py-1 rounded-full text-xs font-semibold uppercase ${data.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
          {data.type}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-6 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Description</p>
          <p className="font-medium text-gray-900 dark:text-white">{data.description}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Date</p>
          <p className="font-medium text-gray-900 dark:text-white">{format(data.date, "dd MMMM yyyy")}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Category</p>
          <p className="font-medium text-gray-900 dark:text-white">{data.category}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-1">Transaction ID</p>
          <p className="font-medium text-gray-900 dark:text-white">#{data.id}</p>
        </div>
      </div>
    </div>
  );
};

export default View;