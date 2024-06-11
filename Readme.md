## React Transaction Dashboard: Empowering Data-Driven Decisions

This repository showcases a comprehensive React Transaction Dashboard, designed to help businesses gain actionable insights from their transaction data. Built with a robust backend API and a visually appealing front-end, this solution provides a powerful toolkit for managing and analyzing sales trends.

**The Solution**

This project encompasses both the front-end (React) and back-end (Node.js) components of the dashboard. 

**Front-End (React):**

- **Dynamic Data Visualization:**  Fetches live transaction data from a backend API using `axios`.
- **Intuitive Transaction Table:**  Browse, search, and filter transaction details with ease, including title, description, price, category, date, and sold status.
- **Actionable Analytics:**
    - **Statistics Box:** Get a quick overview of key metrics: total sales, sold items, and unsold items.
    - **Bar Chart:**  Visualize sales trends over time, identifying peak seasons and potential areas for growth.
    - **Pie Chart:** Analyze the distribution of products or services across categories to understand your business mix.
- **Focused Filtering:** Use the Month Selector to quickly zero in on specific time periods and drill down into the data that matters most.
- **Modern Design:**  Built with React and styled with Tailwind CSS for a clean and professional aesthetic.

**Back-End (Node.js):**

- **Secure Database Connection:** Uses `mongoose` to connect to a MongoDB database, storing and retrieving transaction data.
- **Robust API Endpoints:** Provides API routes for fetching combined transaction data, statistics, bar chart data, pie chart data, and individual transaction lists.
- **Data Aggregation and Analysis:**  Leverages `mongoose` aggregation to calculate statistics and generate chart data efficiently.
- **Error Handling:** Includes logging and error handling to ensure server stability.

**Key Implementations:**

* **Data Fetching and Display:** The front-end dynamically fetches data from the backend API and displays it in a user-friendly transaction table.
* **Search and Filtering:** Users can easily search and filter transactions by title, description, or date, enabling them to quickly find the information they need.
* **Comprehensive Analytics:** The dashboard offers a suite of data visualizations, including bar and pie charts, to reveal trends and insights. 
* **Month Selection:**  The Month Selector allows users to focus on specific timeframes for in-depth analysis.
* **API Route Management:**  The backend API defines and manages secure routes for data retrieval and data aggregation.
* **Database Integration:** Transactions are stored and retrieved from a MongoDB database using Mongoose.

**Technology Stack:**

* **Front-End:** React, Tailwind CSS, Chart.js, Axios
* **Back-End:** Node.js, Express, Mongoose, Axios, Dotenv, Winston 

**Getting Started:**

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/SahilPB11/Roxiler_MERN_Assignment.git
   ```

2. **Navigate to the Client Folder:**

   ```bash
   cd react-transaction-dashboard/client
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Start the Front-end:**

   ```bash
   npm run dev
   ```
   Your dashboard will be accessible at `http://localhost:5173/`.

5. **Start the Back-end:**
   ```bash
   cd react-transaction-dashboard/server
   npm install
   npm run dev
   ```
   This will start the server in development mode with automatic restarting on changes.

**Next Steps:**

- **Customization:**  Adapt the dashboard to fit your specific business needs by adding additional data points, visualizations, or custom filters.
- **Extend Functionality:** Implement user authentication, data export, or other features to enhance user experience.

**Contact:**

For inquiries or feedback, please contact SahilPB11 (github username) or through the GitHub repository.
