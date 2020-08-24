//TODO

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const { StockLevelSchema, StockLevelErrorSchema, StockLevelInfoSchema } = require("../../../src/models/stockLevelModel");
const { getStockLevels, postStockLevel, getStockLevelInfo, postDecreaseStockLevelQty } = require("../../../src/controllers/stockController");
const mongoose = require("mongoose");
let server = require("../../../index");

const StockLevel = mongoose.model("StockLevel", StockLevelSchema);
const StockLevelError = mongoose.model("StockLevelError", StockLevelErrorSchema);
const StockLevelInfo = mongoose.model("StockLevelInfo", StockLevelInfoSchema);

let errorCodes = {
  "401": "This is error code 401. Duplicated key.",
  "402": "This is error code 402. No such productName in DB.",
  "403": "This is error code 403. It is not possible to decrease such a qty for the product.",
};

chai.use(chaiHttp);
describe("Joao is testing: ", () => {
  beforeEach((done) => {
    //Before each test, empty the db
    StockLevel.remove({}, (err) => {
      if (err) {
        res.send(err);
        throw err;
      }
    });
    done();
  });

  /*
   * Test the /GET route
   */
  describe("/GET get all stockLevel", () => {
    it("it should GET all the stockLevel", (done) => {
      chai
        .request(server)
        .get("/stockLevel")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe("/POST stockLevel", () => {
    it("it should not POST a stockLevel without productName field", (done) => {
      let stock = {
        productName: "chai_mocha_test_prod",
        quantity: 10,
      };
      chai
        .request(server)
        .post("/stockLevel")
        .send(stock)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          // res.body.should.have.property("errors");
          // res.body.errors.should.have.property("productName");
          // res.body.errors.productName.should.have.property("kind").eql("required");
          done();
        });
    });
  });
});
