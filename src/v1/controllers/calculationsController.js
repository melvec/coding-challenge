const httpStatus = require("http-status");
const { createResponseObject } = require("../utils/response");
const { loadData } = require("../utils/dataLoader");

/* calculate  */
const getResults = async (req, res) => {
  try {
    // Example: Mock revenue data

    const allData = loadData();

    const formatCurrency = (value) => {
      return Math.floor(value).toLocaleString();
    };

    const formatPercentage = (value) => {
      return value.toFixed(1);
    };

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

    const calculateAssets = (data, value_type) => {
      return data.reduce((total, entry) => {
        if (
          entry.account_category === "assets" &&
          entry.value_type === value_type &&
          (entry.account_type === "current" ||
            entry.account_type === "bank" ||
            entry.account_type === "current_accounts_receivable")
        ) {
          return total + (entry.total_value || 0);
        }
        return total;
      }, 0);
    };

    const calculateLiabilities = (data, value_type) => {
      return data.reduce((total, entry) => {
        if (
          entry.account_category === "liability" &&
          entry.value_type === value_type &&
          (entry.account_type === "current" ||
            entry.account_type === "current_accounts_receivable")
        ) {
          return total + (entry.total_value || 0);
        }
        return total;
      }, 0);
    };

    const assets =
      calculateAssets(allData.data, "debit") -
      calculateAssets(allData.data, "credit");

    const liabilities =
      calculateLiabilities(allData.data, "credit") -
      calculateLiabilities(allData.data, "debit");

    const workingCapitalRatio = assets / liabilities;

    // Call the function with the data
    const totalRevenue = calculateTotal(allData.data, "revenue");
    const totalExpenses = calculateTotal(allData.data, "expense");
    const grossProfit = calculateGrossProfit(allData.data);

    // Calculate Gross Profit Margin
    const grossProfitMargin = totalRevenue
      ? (grossProfit / totalRevenue) * 100
      : 0;

    // Calculate Net Profit Margin
    const netProfit = totalRevenue - totalExpenses;
    const netProfitMargin = totalRevenue ? (netProfit / totalRevenue) * 100 : 0;

    const result = {
      Revenue: `$${formatCurrency(totalRevenue)}`,
      Expenses: `$${formatCurrency(totalExpenses)}`,
      GrossProfitMargin: `%${formatPercentage(grossProfitMargin)}`,
      NetProfitMargin: `%${formatPercentage(netProfitMargin)}`,
      workingCapitalRatio: `%${formatPercentage(workingCapitalRatio)}`,
    };

    return res.status(200).json(createResponseObject(result));
  } catch (err) {
    return res.status(500).json(
      createResponseObject({
        error: err.message,
      })
    );
  }
};

module.exports = {
  getResults,
};
