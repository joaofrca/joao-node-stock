const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StockLevelSchema = new Schema({
  productName: {
    type: String,
    required: "Enter a product name",
  },
  quantity: {
    type: Number,
    required: "Enter a quantity",
  },
  creationDate: {
    type: Date,
    required: "Enter creation date",
    default: Date.now,
  },
  lastUpdate: {
    type: Date,
    required: "Enter last updated date",
    default: Date.now,
  },
});

const StockLevelErrorSchema = new Schema({
  productName: {
    type: String,
    required: "Enter a product name",
  },
  errorCode: {
    type: String,
    required: "Enter an error code",
  },
  errorMessage: {
    type: String,
    required: "Enter an error code",
    default: "This is a retrieved error",
  },
});

const StockLevelInfoSchema = new Schema({
  stockLevelAvailability: {
    type: String,
    required: "Enter a Stock Level Availability",
  },
  lastUpdate: {
    type: Date,
    required: "Enter last updated date",
    default: Date.now,
  },
});

const StockLevel = mongoose.model("StockLevel", StockLevelSchema);
const StockLevelError = mongoose.model("StockLevelError", StockLevelErrorSchema);
const StockLevelInfo = mongoose.model("StockLevelInfo", StockLevelInfoSchema);

module.exports = {
  StockLevel: StockLevel,
  StockLevelError: StockLevelError,
  StockLevelInfo: StockLevelInfo,
}