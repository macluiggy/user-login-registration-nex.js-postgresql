import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
import validEmail from "utils/validEmail";
const assert = chai.assert;
chai.use(chaiHttp);

describe("Unit tests", () => {
  describe("Basic assertions", () => {
    it("Verify if the eamil is valid or invalid", () => {
      assert.isTrue(validEmail("luiggy@gmail.com"));
      assert.isFalse(validEmail("luiggy@gmail"));
    });
  });
});
