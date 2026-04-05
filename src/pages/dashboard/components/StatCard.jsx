const StatCard = ({
  title,
  amount,
  icon: Icon,
  trend,
  colorClass,
  bgClass,
}) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bgClass} ${colorClass}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium px-2.5 py-1 rounded-full ${trend.startsWith("+") ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" : "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"}`}
          >
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          ₹{amount.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default StatCard;
