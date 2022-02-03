import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import server from "../index";
const assert = chai.assert;
chai.use(chaiHttp);

describe("Testing the api endpoints", () => {
  describe("testing /api/users", () => {
    let apiUsers = "/api/users";
    it("Should GET all the users", (done) => {
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
          email: "emai@email.com",
          password: "password",
        })
        .end((err, res) => {
          // console.log(res.body);
          assert.equal(res.status, 401);
          assert.equal(res.body.error, "Missing credential(s)");
          done();
        });
    });

    it("Should return an error message when email is invalid", (done) => {
      chai
        .request(server)
        .post(apiUsers)
        .send({
          name: "name",
          email: "email",
          password: "password",
        })
        .end((err, res) => {
          // console.log(res.body, "AAAAAAAQUIIIII");
          assert.equal(res.status, 401);
          assert.equal(res.body.error, "Invalid email");
          done();
        });
    });

    it("Should return and error message when creating an user with and email that already exists", (done) => {
      chai
        .request(server)
        .post(apiUsers)
        .send({
          name: "luiggy",
          email: "luiggy@gmail.com",
          password: "testing",
        })
        .end((err, res) => {
          // console.log(
          //   res.body,
          //   "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQUIIIIIIIIIIIIIIIIIIIIIIIIIIIII"
          // );
          // console.log(err, "err");
          assert.equal(res.status, 409);
          assert.equal(res.body.error, "email already exists");
          done();
        });
    });

    it("Should do a CRUD", (done) => {
      //Creating a user: C
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

          // Singinig in with correct password: R
          chai
            .request(server)
            .post("/auth/signin")
            .send({ email: "testing@gmail.com", password: "testing" })
            .end((err, res) => {
              // console.log(res.body, "signing in");
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.isOk(res.body.token);
              assert.isTrue(res.body.user._id.length === 36);
              assert.isNull(res.body.user.updated);

              // Updating the user: U
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
                  assert.equal(res.status, 200);
                  assert.isObject(res.body);
                  assert.equal(res.body.message, "User updated successfully");
                });
              // Deleting the user: D
              chai
                .request(server)
                .delete(apiUsers + "/" + res.body.user._id)
                .set("Authorization", "Bearer " + res.body.token)
                .end((err, res) => {
                  console.log(res.body, "DELETING THE USER ");
                  assert.equal(res.status, 200);
                  assert.isObject(res.body);
                  assert.equal(res.body.message, "User deleted successfully");
                });
            });

          done();
        });
    });
  });

  describe("Testing /auth/sigin", () => {
    it("Should return the user data", (done) => {
      //getting the user53c378ed-896a-4c68-a590-7d37786a43c4
      chai
        .request(server)
        .post("/auth/signin")
        .send({ email: "luiggy@gmail.com", password: "123456" })
        .end((_err, res) => {
          console.log(res.body, "signing in");
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.isOk(res.body.token);
          assert.isTrue(res.body.user._id.length === 36);
          assert.isNotNull(res.body.user.updated);

          // //getting the user 53c378ed-896a-4c68-a590-7d37786a43c4
          chai
            .request(server)
            .get(`/api/users/${res.body.user._id}`)
            .set("Authorization", `Bearer ${res.body.token}`)
            .end((err, res) => {
              // console.log(res.body, "getting the user");
              // console.log(
              //   "HOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLAAAAAAAAAAAAAAAAAAAAAAAAA"
              // );
              assert.equal(res.status, 200);
              assert.isObject(res.body);
              assert.isTrue(res.body._id.length === 36);
              assert.isOk(res.body.updated);
              assert.strictEqual(res.body.name, "luiggy");
              assert.strictEqual(res.body.email, "luiggy@gmail.com");
              done();
            });
        });
    });

    it("Should return an error message when using incorrect password", (done) => {
      chai
        .request(server)
        .post("/auth/signin")
        .send({
          email: "luiggy@gmail.com",
          password: "testing1",
        })
        .end((err, res) => {
          // console.log(res.body, "AAAAQUIIII");
          assert.equal(res.status, 401);
          assert.equal(res.body.error, "Email and password don't match");
          done();
        });
    });

    it("Should return and error message when using an user that does not exists", (done) => {
      chai
        .request(server)
        .post("/auth/signin")
        .send({
          email: "thisemaildoesntexits@gmail.com",
          password: "testing",
        })
        .end((err, res) => {
          console.log(res.body, "AAAAQUIIII");
          assert.equal(res.status, 401);
          assert.equal(res.body.error, "User not found");
          done();
        });
    });
  });
});
