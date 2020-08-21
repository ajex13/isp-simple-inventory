const chai = require("chai");
const chaiHttp = require("chai-http");
let server = require("../server");


chai.should();
chai.use(chaiHttp);

describe('ProductsApi', () => {

    // test fetch all products 
    describe("GET /products", () => {
        it("should fetch all products", (done)=> {
            chai.request(server)
            .get("/products")
            .end((error, response) => {
                console.log('error',error)
                response.should.have.status(200);
                response.body.should.be.a("array");
                done();
            } ) 
        })
    })

    // test fetch one product  
    
    // test update quantity/ treshold

    // test create new warehouse 


})
