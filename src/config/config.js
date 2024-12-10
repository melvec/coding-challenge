const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8100;
const env = process.env.NODE_ENV || "development";

module.exports = {
  port,
  env,
};
