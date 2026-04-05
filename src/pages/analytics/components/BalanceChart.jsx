import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceChart = ({ data }) => {
  return (
    <div className="h-75 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#374151"
            opacity={0.2}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(val) => `₹${val}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            name="Cumulative Balance"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
