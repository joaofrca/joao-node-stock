const mongoose = require("mongoose");
const { StockLevelSchema, StockLevelErrorSchema, StockLevelInfoSchema } = require("../models/stockLevelModel");

const StockLevel = mongoose.model("StockLevel", StockLevelSchema);
const StockLevelError = mongoose.model("StockLevelError", StockLevelErrorSchema);
const StockLevelInfo = mongoose.model("StockLevelInfo", StockLevelInfoSchema);

let errorCodes = {
  "401": "This is error code 401. Duplicated key.",
  "402": "This is error code 402. No such productName in DB.",
  "403": "This is error code 403. It is not possible to decrease such a qty for the product.",
  "404": "This is error code 404. It is not possible to post a product with negative qty.",
};

exports.getStockLevels = (req, res) => {
  StockLevel.find({}, (err, stock) => {
    if (err) {
      res.send(err);
      throw err;
    }
    res.json(stock);
  });
};

exports.postStockLevel = (req, res) => {
  StockLevel.findOne({ productName: req.body.productName }, (err, stockLevel) => {
    if (err) {
      console.log("UNEXPECTED ERROR: " + err);
      res.send(err);
      throw err;
    }

    if (stockLevel) {
      let newStockLevelError = getStockLevelError(req.body, "401");
      res.json(newStockLevelError);
    } else if (!stockLevel && req.body.quantity < 0) {
      let newStockLevelError = getStockLevelError(req.body, "404");
      res.json(newStockLevelError);
    } else {
      let newStockLevel = new StockLevel(req.body);

      newStockLevel.save((err, stock) => {
        if (err) {
          res.send(err);
          throw err;
        }
        res.json(stock);
      });
    }
  });
};

/**
 * Retrieves the StockLevelError for a given product and error code.
 *
 * @param {any} body
 * @param {String} errorCode
 * @return {StockLevelError}
 */
function getStockLevelError(body, code) {
  let newStockLevelError = new StockLevelError(body);
  newStockLevelError["errorCode"] = code;
  newStockLevelError["errorMessage"] = errorCodes[code];
  return newStockLevelError;
}

exports.getStockLevelInfo = (req, res) => {
  StockLevel.findOne({ productName: req.body.productName }, (err, stockLevel) => {
    if (err) {
      console.log("UNEXPECTED ERROR: " + err);
      res.send(err);
      throw err;
    }
    if (stockLevel) {
      let newStockLevelInfo = new StockLevelInfo(req.body);
      newStockLevelInfo["stockLevelAvailability"] = getStockLevelAvailabilityForProduct(stockLevel["quantity"]);
      newStockLevelInfo["lastUpdate"] = stockLevel["lastUpdate"];

      res.json(newStockLevelInfo);
    } else {
      let newStockLevelError = getStockLevelError(req.body, "402");
      res.json(newStockLevelError);
    }
  });
};

/**
 * Retrieves the stockLevelAvailability for a given qty.
 *
 * @param {String} qty
 * @return {String} stockLevelAvailability
 */
function getStockLevelAvailabilityForProduct(qty) {
  if (qty <= 0) {
    return "OUT";
  } else if (qty <= 5) {
    return "LOW";
  } else if (qty <= 15) {
    return "MEDIUM";
  } else {
    return "HIGH";
  }
}

exports.postDecreaseStockLevelQty = (req, res) => {
  StockLevel.findOne({ productName: req.body.productName }, (err, stockLevel) => {
    if (err) {
      console.log("UNEXPECTED ERROR: " + err);
      res.send(err);
      throw err;
    }
    if (stockLevel && isQuantityAvailable(stockLevel["quantity"], req.body.quantity)) {
      stockLevel["lastUpdate"] = new Date();
      stockLevel["quantity"] = stockLevel["quantity"] - req.body.quantity;

      stockLevel.save((err, stock) => {
        if (err) {
          res.send(err);
          throw err;
        }
        res.json(stock);
      });
    } else if (stockLevel && !isQuantityAvailable(stockLevel["quantity"], req.body.quantity)) {
      let newStockLevelError = getStockLevelError(req.body, "403");
      res.json(newStockLevelError);
    } else {
      let newStockLevelError = getStockLevelError(req.body, "402");
      res.json(newStockLevelError);
    }
  });
};

/**
 * Checks if the current qty is bigger or equal to the quantity to be decreased.
 *
 * @param {String} toDecreaseQty,
 * @return {boolean}
 */
function isQuantityAvailable(currentQty, toDecreaseQty) {
  return currentQty >= toDecreaseQty ? true : false;
}
