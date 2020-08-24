const { getStockLevels, postStockLevel, getStockLevelInfo, postDecreaseStockLevelQty } = require("../controllers/stockController");

const routes = (app) => {
  app
    .route("/stockLevel")
    .get((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, getStockLevels)
    .post((req, res, next) => {
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request type: ${req.method}`);
      next();
    }, postStockLevel);

  app.route("/decreaseStockLevel").post((req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, postDecreaseStockLevelQty);

  app.route("/stockLevelInfo").get((req, res, next) => {
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    next();
  }, getStockLevelInfo);
};

// export default routes;
module.exports = routes;