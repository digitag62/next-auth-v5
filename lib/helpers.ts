import bcrypt from 'bcrypt';

export const comparePasswordHash = async (pwd: string, hashedPwd: string) => await bcrypt.compare(pwd, hashedPwd);
