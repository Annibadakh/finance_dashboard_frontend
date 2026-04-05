import { useState, useEffect } from "react";
import { dashboardService } from "./dashboard.service";
import { useTransaction } from "../../context/TransactionContext";

export const useDashboard = () => {
  const { getAll } = useTransaction();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("30days"); // '7days', '30days', 'year'

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await dashboardService.getSummary(filter, getAll());
        setData(res);
        setError("");
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [filter]);

  return {
    data,
    loading,
    error,
    filter,
    setFilter,
  };
};
