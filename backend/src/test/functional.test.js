import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import server from "../index";
const assert = chai.assert;
chai.use(chaiHttp);

describe("Testing the api endpoints", () => {
  describe("testing /api/users", () => {
    let apiUsers = "/api/users";
    it("Test GETting all the users", (done) => {
      assert.isNotNull("hello");
      chai
        .request(server)
        .get(apiUsers)
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.isNotNull(res.body);
          assert.equal(res.type, "application/json");
          done();
        });
    });
    it("Should return a message error if one or more credential are missing when register", (done) => {
      chai
        .request(server)
        .post(apiUsers)
        .send({
          name: "",
          email: "",
          password: "",
        })
        .end((err, res) => {
          console.log(res.body);
          assert.equal(res.status, 400);
          assert.equal(res.body.message, "Missing credentials");
          done();
        });
    });
    it("Test creating ", (done) => {
      chai
        .request(server)
        .post(apiUsers)
        .send({
          name: "testing",
          email: "testing@gmail.com",
          password: "testing",
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          // console.log(res.body, "posting");
          // let token =
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDM3NDQzNzd9.eynRlSLA9r4Fg9AWkdKhR3vwCBeInJkBkhEBeZmdX2E";
          chai
            .request(server)
            .post("/auth/signin")
            .send({ email: "testing@gmail.com", password: "testing" })
            .end((err, res) => {
              // console.log(res.body, "signing in");
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              //getting the user
              chai
                .request(server)
                .get(`/api/users/${res.body.user._id}`)
                .set("Authorization", `Bearer ${res.body.token}`)
                .end((err, res) => {
                  // console.log(res.body, "getting the user");
                });
              // updating the user
              chai
                .request(server)
                .put(`/api/users/${res.body.user._id}`)
                .set("Authorization", `Bearer ${res.body.token}`)
                .send({
                  name: "testing2",
                  email: "tesing2@gmail.com",
                  password: "testing",
                })
                .end((err, res) => {
                  // console.log(res.body, "updating the user");
                });
              //deleting the user
              chai
                .request(server)
                .delete(apiUsers + "/" + res.body.user._id)
                .set("Authorization", "Bearer " + res.body.token)
                .end((err, res) => {
                  // console.log(res.body, "DELETING THE USER ");
                });
            });

          done();
        });
    });
  });
});
