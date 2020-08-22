const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../server");

chai.should();
chai.use(chaiHttp);

describe("ProductsApi", () => {
  // test fetch all products
  describe("GET /products", () => {
    it("should fetch all products", (done) => {
      chai
        .request(server)
        .get("/products")
        .end((error, response) => {
          console.log("error", error);
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
  });

  // test fetch one product
  describe("GET /products/:id", () => {
    it("should fetch one product by id", (done) => {
      const productId = 1;
      chai
        .request(server)
        .get(`/products/${productId}`)
        .end((error, response) => {
          console.log("error", error);
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(productId);
          response.body.should.have.property("Warehouses");
          done();
        });
    });
  });

  // test update quantity/ treshold
  describe("PATCH /products/:id", () => {
    it("should modify count and theshold of product for respective warehouses", (done) => {
      const productId = 1;
      const payload = {
        data: [
          {
            warehouseId: 1,
            item_count: 111,
            low_item_threshold: 101,
          },
          {
            warehouseId: 2,
            item_count: 111,
            low_item_threshold: 101,
          },
          {
            warehouseId: 3,
            item_count: 111,
            low_item_threshold: 101,
          },
        ],
      };

      chai
        .request(server)
        .patch(`/products/${productId}`)
        .send(payload)
        .end((error, response) => {
          console.log("error", error);
          response.should.have.status(204);
          done();
        });
    });
  });

  // test create new warehouse
});
