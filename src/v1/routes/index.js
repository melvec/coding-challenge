const express = require("express");
const dataRoute = require("./data.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/data",
    route: dataRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
