import React, { useState } from "react";
import axios from "axios";

const TransactionTable = ({ transactions }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);

  const handleSearch = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/transactions/list?month=03&search=${search}&page=${page}`
    );
    setFilteredTransactions(data);
  };

  const handleClearSearch = () => {
    setSearch("");
    setFilteredTransactions(transactions);
  };

  return (
    <div className="mb-4">
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Transactions"
        />
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          Search
        </button>
        <button
          onClick={handleClearSearch}
          className="ml-2 p-2 bg-gray-500 text-white rounded-md"
        >
          Clear
        </button>
      </div>
      <table className="min-w-full bg-white border rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Date of Sale</th>
            <th className="py-2 px-4 border-b">Sold</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td className="py-2 px-4 border-b">{transaction?.title}</td>
              <td className="py-2 px-4 border-b">{transaction?.description}</td>
              <td className="py-2 px-4 border-b">{transaction?.price}</td>
              <td className="py-2 px-4 border-b">{transaction?.category}</td>
              <td className="py-2 px-4 border-b">{transaction?.dateOfSale}</td>
              <td className="py-2 px-4 border-b">
                {transaction.sold ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="p-2 bg-gray-500 text-white rounded-md mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="p-2 bg-blue-500 text-white rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTable;
