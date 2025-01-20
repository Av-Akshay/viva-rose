import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    pv: 6300,
    amt: 2100,
  },
  {
    name: "Sep",
    pv: 2300,
    amt: 2100,
  },
  {
    name: "Oct",
    pv: 5300,
    amt: 2100,
  },
  {
    name: "Nov",
    pv: 3300,
    amt: 2100,
  },
  {
    name: "Dec",
    pv: 4300,
    amt: 2100,
  },
];

const DashboardBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
