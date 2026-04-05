import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ComparisonChart = ({ data }) => {
  return (
    <div className="h-[350px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            cursor={{ fill: "#374151", opacity: 0.1 }}
          />
          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: "12px" }}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
          <Bar
            dataKey="expense"
            name="Expense"
            fill="#f43f5e"
            radius={[4, 4, 0, 0]}
            barSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComparisonChart;
