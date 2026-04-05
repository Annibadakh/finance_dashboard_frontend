import {
  FiDownload,
  FiPieChart,
  FiTrendingUp,
  FiActivity,
  FiDollarSign,
} from "react-icons/fi";
import { useAnalytics } from "./useAnalytics";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import SelectField from "../../components/SelectField";
import DatePickerField from "../../components/DatePickerField";
import ComparisonChart from "./components/ComparisonChart";
import BalanceChart from "./components/BalanceChart";

const View = () => {
  const { data, loading, error, filters, handleFilterChange } = useAnalytics();

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "software", label: "Software" },
    { value: "marketing", label: "Marketing" },
    { value: "payroll", label: "Payroll" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Report
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deep dive into your financial metrics.
          </p>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <DatePickerField
          label="Start Date"
          selectedDate={filters.startDate}
          onChange={(date) => handleFilterChange("startDate", date)}
        />
        <DatePickerField
          label="End Date"
          selectedDate={filters.endDate}
          onChange={(date) => handleFilterChange("endDate", date)}
        />
        <SelectField
          label="Category"
          options={categoryOptions}
          value={filters.category}
          onChange={(val) => handleFilterChange("category", val)}
        />
      </div>

      {loading ? (
        <div className="py-20">
          <Loader text="Generating Report..." />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="Total Income"
              amount={`₹${data.summary.totalIncome}`}
              icon={FiTrendingUp}
              color="text-emerald-500"
            />
            <MetricCard
              title="Total Expense"
              amount={`₹${data.summary.totalExpense}`}
              icon={FiActivity}
              color="text-rose-500"
            />
            <MetricCard
              title="Net Savings"
              amount={`₹${data.summary.netSavings}`}
              icon={FiDollarSign}
              color="text-blue-500"
            />
            <MetricCard
              title="Savings Rate"
              amount={data.summary.savingsRate}
              icon={FiPieChart}
              color="text-indigo-500"
            />
          </div>

          {/* Detailed Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Income vs Expense Bar Chart */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Income vs Expense
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Monthly comparison
              </p>
              <ComparisonChart data={data.comparisonData} />
            </div>

            {/* Cumulative Balance Line Chart */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Balance Growth
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Cumulative retained earnings
              </p>
              <BalanceChart data={data.balanceData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Mini internal component for quick metric display
const MetricCard = ({ title, amount, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <div className={`p-2 bg-gray-50 dark:bg-gray-800 rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </p>
    </div>
    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
      {amount}
    </h4>
  </div>
);

export default View;
