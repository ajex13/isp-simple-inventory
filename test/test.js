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
          response.body.should.have.property("Warehoses");
          done();
        });
    });
  });

  // test update quantity/ treshold

  // test create new warehouse
});
