import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";
import validEmail from "utils/validEmail";
import areCredentialAvailable from "../utils/areCredentialsAvailable";
import encryptPassword from "../utils/ecryptPassword";
const assert = chai.assert;
chai.use(chaiHttp);

describe("Unit tests", () => {
  describe("Basic assertions", () => {
    it("Verify if the eamil is valid or invalid", () => {
      assert.isTrue(validEmail("luiggy@gmail.com"));
      assert.isFalse(validEmail("luiggy@gmail"));
    });
    it("Shuould check if one or more credentials are missing", () => {
      assert.isTrue(areCredentialAvailable(["email", "password"]));
      assert.isTrue(areCredentialAvailable(["luiggy@gmail.com", "contraseña"]));
      assert.isFalse(
        areCredentialAvailable(["luiggy@gmail.com", ""]),
        "one or more credentials missing return false"
      );
      assert.isTrue(
        areCredentialAvailable(["kakaroto", "goku@gmail.com", "kamehameha"])
      );
      assert.isFalse(
        areCredentialAvailable([undefined, "goku@gmail.com", null])
      );
    });
    it("Check if the password is encrypted", async () => {
      const arr = await encryptPassword("password");
      const [hashed_password, salt] = arr;
      console.log(arr);
      assert.isArray(arr);
      assert.isTrue(arr.length > 0);
      assert.isNotNull(hashed_password);
      assert.isNotNull(salt);
      assert.equal(hashed_password.includes(salt), true);
    });
  });
});
