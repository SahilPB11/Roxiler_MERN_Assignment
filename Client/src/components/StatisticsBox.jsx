import React from 'react';

const StatisticsBox = ({ statistics }) => (
    <div className="mb-4 p-4 bg-white shadow rounded-md">
        <h3 className="text-lg font-medium mb-4">Statistics</h3>
        <p className="mb-2">Total Sale Amount: {statistics.totalAmount}</p>
        <p className="mb-2">Total Sold Items: {statistics.totalSold}</p>
        <p>Total Not Sold Items: {statistics.totalNotSold}</p>
    </div>
);

export default StatisticsBox;
