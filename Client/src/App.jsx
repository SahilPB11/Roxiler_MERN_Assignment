import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionTable from "./components/TransactionTable.jsx";
import StatisticsBox from "./components/StatisticsBox.jsx";
import BarChart from "./components/BarChart.jsx";
import PieChart from "./components/PieChart.jsx";
import MonthSelector from "./components/MonthSelector.jsx";

const App = () => {
  const [month, setMonth] = useState("03");
  const [year, setYear] = useState("2021"); // Default year
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState([]);
  const [pieChart, setPieChart] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month, year]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/transactions/combined-data?month=${month}&year=${year}`
      );
      const { transactions, statistics, barChart, pieChart } = response.data;
      setTransactions(transactions);
      setStatistics(statistics);
      setBarChart(barChart);
      setPieChart(pieChart);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <MonthSelector month={month} year={year} setMonth={setMonth} setYear={setYear} />
      <TransactionTable transactions={transactions} />
      <StatisticsBox statistics={statistics} />
      <BarChart data={barChart} />
      <PieChart data={pieChart} />
    </div>
  );
};

export default App;
