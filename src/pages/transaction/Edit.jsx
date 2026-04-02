import React from "react";
import { useParams } from "react-router-dom";
import { useTransactions } from "./useTransactions";
import { TransactionForm } from "./Create";
import Loader from "../../components/Loader";

const Edit = () => {
  const { id } = useParams();
  const { singleData, loading, error } = useTransactions(id);

  if (loading) return <Loader fullScreen text="Loading transaction..." />;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return <TransactionForm initialData={singleData} title="Edit Transaction" />;
};

export default Edit;