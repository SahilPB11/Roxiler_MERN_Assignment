import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "./components/TransactionTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import MonthSelector from "./components/MonthSelector";

const App = () => {
  const [month, setMonth] = useState("03");
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState([]);
  const [pieChart, setPieChart] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/transactions/combined-data?month=${month}`
    );
    setTransactions(data.transactions);
    setStatistics(data.statistics);
    setBarChart(data.barChart);
    setPieChart(data.pieChart);
  };

  return (
    <div className="container mx-auto p-4">
      <MonthSelector month={month} setMonth={setMonth} />
      <TransactionTable transactions={transactions} />
      <StatisticsBox statistics={statistics} />
      <BarChart data={barChart} />
      <PieChart data={pieChart} />
    </div>
  );
};

export default App;
