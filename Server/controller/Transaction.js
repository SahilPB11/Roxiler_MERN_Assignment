const axios = require("axios");
import Transaction from "../Models/Transaction.js";

const initializeDatabase = async (req, res) => {
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

const listTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const query = { dateOfSale: { $regex: `-${month.padStart(2, "0")}-` } };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { price: { $regex: search, $options: "i" } },
    ];
  }

  const transactions = await Transaction.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage);

  res.status(200).json(transactions);
};

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $regex: `-${month.padStart(2, "0")}-` } };

  const totalSales = await Transaction.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: "$price" },
        totalSold: { $sum: { $cond: ["$sold", 1, 0] } },
        totalNotSold: { $sum: { $cond: ["$sold", 0, 1] } },
      },
    },
  ]);

  res.status(200).json(totalSales[0]);
};

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $regex: `-${month.padStart(2, "0")}-` } };

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
        ...query,
        price: { $gte: min, $lte: max },
      });
      return { range, count };
    })
  );

  res.status(200).json(result);
};

const getPieChart = async (req, res) => {
  const { month } = req.query;
  const query = { dateOfSale: { $regex: `-${month.padStart(2, "0")}-` } };

  const categories = await Transaction.aggregate([
    { $match: query },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  res.status(200).json(categories);
};

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  const [transactions, statistics, barChart, pieChart] = await Promise.all([
    listTransactions({ query: { month, page: 1, perPage: 1000 } }),
    getStatistics({ query: { month } }),
    getBarChart({ query: { month } }),
    getPieChart({ query: { month } }),
  ]);

  res.status(200).json({ transactions, statistics, barChart, pieChart });
};

module.exports = {
  initializeDatabase,
  listTransactions,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData,
};
