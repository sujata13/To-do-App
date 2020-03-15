let request = require("supertest");
let app = require("../src/app");
const assert = require("chai").assert;

var Cookies;

describe("Functional Test #start_test", function() {
  it("should create user session for valid user", function(done) {
    request(app)
      .post("/signin")
      .set("Accept", "application/json")
      .send({ email: "john@wick.com", password: "mydog<3" })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 302);
        Cookies = res.header["set-cookie"];
        assert.notEqual(Cookies, undefined);
        console.log("The Cookie: " + Cookies);
        done();
      });
  });
  it("should check signin", function(done) {
    request(app)
      .get("/signin")
      .set("Accept", "application/json")
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });
  it("shouldn't create user session for invalid user #end_test", function(done) {
    console.log("**************************************************************");
    console.log("**************************************************************");
    console.log("Before pushing your codes online delete your database file and\ncreate a user account with given credentials");
    console.log("username:AnythingYouWant\nEmail-address:led@zeppelin.com\nPassword:stairwaytoheaven");
    console.log("**************************************************************");
    console.log("**************************************************************");
    request(app)
      .post("/signin")
      .set("Accept", "application/json")
      .send({ email: "linkin@park.com", password: "messi" })
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.status, 302);
        Cookies = res.header["set-cookie"];
        assert.equal(Cookies, undefined);
        console.log("The Cookie: " + Cookies);
        done();
      });
  });
});
