const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../app.js");
const conn = require("../../db/db.js");

describe("POST /users", () => {
  before(done => {
    conn
      .connect()
      .then(() => done())
      .catch(err => done(err));
  });
  it("Create a new user", () => {
    request(app)
      .post("/users")
      .send({
        name: "isuru",
        email: "isurujj@gmail.com",
        password: "pass"
      })
      .then(res => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        done();
      })
      .catch(err => done(err));
    // expect(1 + 2).to.equal(3);
  });
});
