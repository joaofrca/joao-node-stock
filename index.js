// import routes from "./src/routes/stockRoutes";
const routes = require("./src/routes/stockRoutes");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/joaoStockdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get("/", (req, res) => res.send(`Welcome to Joao Stock app! Node and express server running on port ${PORT}`));

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));

module.exports = app;