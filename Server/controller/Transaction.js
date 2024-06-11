import axios from "axios";
import Transaction from "../Models/Transaction.js";

export const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Transaction.insertMany(response.data);
    res.status(200).send("Database initialized");
  } catch (error) {
    res.status(500).send("Error initializing database");
  }
};

export const listTransactions = async (req, res) => {
  try {
    const { month } = req.query;
    const year = new Date().getFullYear(); // or another year if needed

    const startDate = new Date(year, month - 1, 1); // month is 0-indexed
    const endDate = new Date(year, month, 0); // last day of the month

    const transactions = await Transaction.find({
      date: { $gte: startDate, $lte: endDate },
    });

    return transactions; // Return the data
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const getStatistics = async (req) => {
  try {
    const { month } = req.query;
    const year = new Date().getFullYear(); // or another year if needed

    const startDate = new Date(year, month - 1, 1); // month is 0-indexed
    const endDate = new Date(year, month, 0); // last day of the month

    const totalSales = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          totalSold: { $sum: { $cond: ["$sold", 1, 0] } },
          totalNotSold: { $sum: { $cond: ["$sold", 0, 1] } },
        },
      },
    ]);

    return totalSales[0] || {}; // Return the data
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const getBarChart = async (req) => {
  try {
    const { month } = req.query;
    const year = new Date().getFullYear(); // or another year if needed

    const startDate = new Date(year, month - 1, 1); // month is 0-indexed
    const endDate = new Date(year, month, 0); // last day of the month

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const result = await Promise.all(
      priceRanges.map(async ({ range, min, max }) => {
        const count = await Transaction.countDocuments({
          dateOfSale: { $gte: startDate, $lte: endDate },
          price: { $gte: min, $lte: max },
        });
        return { range, count };
      })
    );

    return result; // Return the data
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const getPieChart = async (req) => {
  try {
    const { month } = req.query;
    const year = new Date().getFullYear(); // or another year if needed

    const startDate = new Date(year, month - 1, 1); // month is 0-indexed
    const endDate = new Date(year, month, 0); // last day of the month

    const categories = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: { _id: "$category", count: { $sum: 1 } },
      },
    ]);

    return categories; // Return the data
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
};

export const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      listTransactions(req),
      getStatistics(req),
      getBarChart(req),
      getPieChart(req),
    ]);

    res.status(200).json({ transactions, statistics, barChart, pieChart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
