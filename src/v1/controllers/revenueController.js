const httpStatus = require("http-status");
const { createResponseObject } = require("../utils/response");

/* calculate Revenue */
const getRevenue = async (req, res) => {
  try {
    return res
      .status(httpStatus.OK || 200)
      .json({ message: "Revenue endpoint hit successfully." });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
  }
};

module.exports = {
  getRevenue,
};
