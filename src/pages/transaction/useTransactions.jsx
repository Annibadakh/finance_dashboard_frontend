import { useState, useEffect, useMemo } from "react";
import { transactionService } from "./transaction.service";
import { useTransaction } from "../../context/TransactionContext";

export const useTransactions = (id = null) => {
  const { getAll, remove, transactions } = useTransaction(); // context

  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      if (id) {
        const res = await transactionService.getById(id, { getAll });

        setSingleData(res); // correct shape
      } else {
        const res = await transactionService.getAll(null, { getAll });
        setData(res); // correct shape
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, transactions]);

  const handleDelete = async (deleteId) => {
    try {
      await transactionService.delete(deleteId, { getAll, remove });
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  // Local filtering logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesSearch = item.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesType = filterType === "all" || item.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [data, searchTerm, filterType]);

  return {
    data: filteredData,
    singleData,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    handleDelete,
    refreshData: fetchData,
  };
};
