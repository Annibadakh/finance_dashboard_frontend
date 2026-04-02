import { useState, useEffect, useMemo } from "react";
import { transactionService } from "./transaction.service";

export const useTransactions = (id = null) => {
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
        const res = await transactionService.getById(id);
        setSingleData(res);
      } else {
        const res = await transactionService.getAll();
        setData(res);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDelete = async (deleteId) => {
    await transactionService.delete(deleteId);
    setData(prev => prev.filter(item => item.id !== deleteId));
  };

  // Local filtering logic
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
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
    refreshData: fetchData
  };
};