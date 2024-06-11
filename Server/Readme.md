## React Transaction Dashboard - Server-Side Implementation

This repository houses the server-side components for a React Transaction Dashboard application. The server provides the necessary API endpoints to fetch transaction data and generate analytical insights.

### Project Structure

```
server/
├── index.js       // Main server entry point
├── routes/
│   └── Transaction.js  // Transaction API routes
├── Models/
│   └── Transaction.js   // Mongoose Model for transactions
├── controller/
│   └── Transaction.js   // Controllers for transaction data
├── utils/
│   └── logger.js      // Logger for application events
└── .env              // Environment variables
```

### Technologies Used

- **Express.js:** A robust and popular Node.js framework for building web applications and APIs.
- **Mongoose:** An ODM (Object Document Mapper) for interacting with MongoDB databases, providing a convenient way to model data.
- **Axios:** A promise-based HTTP client for making API requests.
- **Cors:** Enables cross-origin resource sharing, allowing the front-end React application to make requests to the server.
- **Dotenv:** Securely stores and loads environment variables.
- **Winston:** A flexible logging library for capturing and managing application logs.

### Server Setup and Functionality

1. **Server Initialization:**

   - `index.js`: The main server entry point, responsible for:
     - Setting up Express.js application.
     - Configuring CORS middleware to allow cross-origin requests.
     - Loading environment variables from `.env` file.
     - Setting up middlewares for request parsing (JSON and URL-encoded data).
     - Defining routes for the transaction API using `transactionRoutes`.

2. **Transaction Model:**

   - `Models/Transaction.js`: Defines a Mongoose model for transactions, defining the structure of each transaction document stored in the database.
   - Properties: `title`, `description`, `price`, `category`, `dateOfSale`, `sold`

3. **API Routes:**

   - `routes/Transaction.js`:
     - Defines various API routes related to transactions.
     - Each route is associated with a controller function in `controller/Transaction.js`.

4. **Controllers:**

   - `controller/Transaction.js`: Implements the logic for handling API requests:
     - **`initializeDatabase`:** Fetches sample transaction data from an external JSON source and inserts it into the database.
     - **`listTransactions`:** Retrieves a list of transactions based on a specified month and year.
     - **`getStatistics`:** Calculates and returns aggregated statistics (total sales, sold items, unsold items).
     - **`getBarChart`:** Generates bar chart data for visualizing sales based on price ranges.
     - **`getPieChart`:** Generates pie chart data for visualizing the distribution of categories.
     - **`getCombinedData`:** Fetches all data required for the front-end (transactions, statistics, bar chart, pie chart).

5. **Database Connection:**
   - `utils/logger.js`: Provides a logging utility to capture and manage application events (including errors).
   - `connect_with_database`: Handles establishing a connection to the MongoDB database. The connection string and database name are obtained from environment variables in `.env`.

### Usage

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm run dev
   ```
   This will start the server in development mode with automatic restarting on changes.

### Conclusion

This server-side implementation provides a foundation for the React Transaction Dashboard application, enabling data fetching, analysis, and visualization of transaction data.
