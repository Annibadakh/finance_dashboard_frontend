import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiSearch, FiFilter } from "react-icons/fi";
import { useTransactions } from "./useTransactions";
import { useAuth } from "../../context/AuthContext";
import { useConfirm } from "../../context/ConfirmModalContext";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Button from "../../components/Button";

const List = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Assume user.role exists
  const { confirm } = useConfirm();
  
  const isAdmin = user?.role === "admin";

  const { data, loading, searchTerm, setSearchTerm, filterType, setFilterType, handleDelete } = useTransactions();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const itemsPerPage = 5;

  const onSort = (config) => setSortConfig(config);

  const confirmDelete = async (id) => {
    const isConfirmed = await confirm({
      title: "Delete Transaction",
      desc: "Are you sure you want to delete this transaction? This action cannot be undone.",
      confirmText: "Delete",
    });
    if (isConfirmed) handleDelete(id);
  };

  const columns = [
    { header: "Date", accessor: "date", sortable: true, render: (row) => format(row.date, "dd MMM yyyy") },
    { header: "Description", accessor: "description", sortable: true, render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.description}</span> },
    { header: "Category", accessor: "category", sortable: false },
    { 
      header: "Amount", 
      accessor: "amount", 
      sortable: true,
      render: (row) => (
        <span className={`font-bold ${row.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
          {row.type === 'income' ? '+' : '-'}${row.amount.toFixed(2)}
        </span>
      )
    },
    { 
      header: "Type", 
      accessor: "type", 
      sortable: false,
      render: (row) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${row.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
          {row.type}
        </span>
      )
    },
    { 
      header: "Actions", 
      accessor: "actions", 
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" outline iconLeft={FiEye} onClick={() => navigate(`/dashboard/transactions/${row.id}`)} />
          {isAdmin && (
            <>
              <Button variant="info" size="sm" outline iconLeft={FiEdit2} onClick={() => navigate(`/dashboard/transactions/${row.id}/edit`)} />
              <Button variant="danger" size="sm" outline iconLeft={FiTrash2} onClick={() => confirmDelete(row.id)} />
            </>
          )}
        </div>
      )
    }
  ];

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Transactions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your financial activity.</p>
        </div>
        {isAdmin && (
          <Button variant="primary" iconLeft={FiPlus} onClick={() => navigate("/dashboard/transactions/create")}>
            Add Transaction
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search descriptions..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <Table columns={columns} data={paginatedData} isLoading={loading} sortConfig={sortConfig} onSort={onSort} />
      <Pagination currentPage={currentPage} totalPages={Math.ceil(data.length / itemsPerPage)} onPageChange={setCurrentPage} />
    </div>
  );
};

export default List;