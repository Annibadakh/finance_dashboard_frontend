import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#8b5cf6", "#f43f5e", "#f59e0b", "#10b981"];

const CategoryChart = ({ data }) => {
  return (
    <div className="h-75 w-full mt-4 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `₹${value}`}
            contentStyle={{
              backgroundColor: "#1f2937",
              borderColor: "#374151",
              borderRadius: "12px",
              color: "#fff",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: "12px", color: "#9ca3af" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
