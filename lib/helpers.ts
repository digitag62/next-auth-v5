import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>
  await bcrypt.hash(password, 10);
export const comparePasswordHash = async (pwd: string, hashedPwd: string) =>
  await bcrypt.compare(pwd, hashedPwd);
