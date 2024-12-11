const httpStatus = require("http-status");
const { createResponseObject } = require("../utils/response");
const { loadData } = require("../utils/dataLoader");

/* calculate  */
const getResults = async (req, res) => {
  try {
    // Example: Mock revenue data

    const allData = loadData();

    // Function to calculate total revenue and expenses
    const calculateTotal = (data, category) => {
      return data.reduce((total, entry) => {
        if (entry.account_category === category) {
          return total + (entry.total_value || 0);
        }
        return total;
      }, 0);
    };
    // Function to calculate Gross Profit
    const calculateGrossProfit = (data) => {
      return data.reduce((total, entry) => {
        if (entry.account_type === "sales" && entry.value_type === "debit") {
          return total + (entry.total_value || 0);
        }
        return total;
      }, 0);
    };

    // Call the function with the data
    const totalRevenue = calculateTotal(allData.data, "revenue");
    const totalExpenses = calculateTotal(allData.data, "expense");
    const grossProfit = calculateGrossProfit(allData.data);

    // Calculate Gross Profit Margin
    const grossProfitMargin = totalRevenue
      ? ((grossProfit / totalRevenue) * 100).toFixed(2)
      : 0;

    const result = {
      Revenue: totalRevenue,
      Expenses: totalExpenses,
      GrossProfitMargin: `${grossProfitMargin}%`,
    };

    return res
      .status(200)
      .json(
        createResponseObject(true, " Calculations done successfully.", result)
      );
  } catch (err) {
    return res.status(500).json(
      createResponseObject(false, "Failed to calculate revenue.", {
        error: err.message,
      })
    );
  }
};

module.exports = {
  getResults,
};
