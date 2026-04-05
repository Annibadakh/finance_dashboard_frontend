import { useState, useEffect } from "react";
import { useTransaction } from "../../context/TransactionContext";
import { analyticsService } from "./analytics.service";
import { subMonths } from "date-fns";

export const useAnalytics = () => {
  const { getAll } = useTransaction();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Advanced Filters State
  const [filters, setFilters] = useState({
    startDate: subMonths(new Date(), 6), // Default to last 6 months
    endDate: new Date(),
    category: "all",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await analyticsService.getReport(filters, getAll());
        setData(res);
        setError("");
      } catch (err) {
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [filters]); // Re-fetch when filters change

  return {
    data,
    loading,
    error,
    filters,
    handleFilterChange,
  };
};
