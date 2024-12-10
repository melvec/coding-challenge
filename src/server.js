const express = require("express");
require("dotenv").config();
const config = require("./config/config");

const app = express();

// router with version
const routerV1 = require("./v1/routes");
/**
 * Routes API with Version
 */

// v1 api
app.use("/api/v1", routerV1);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
