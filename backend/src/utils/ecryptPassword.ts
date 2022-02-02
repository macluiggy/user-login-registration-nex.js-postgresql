import bcrypt from "bcrypt";

const encryptPassword = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return [await bcrypt.hash(password, salt), salt];
};

export default encryptPassword;
