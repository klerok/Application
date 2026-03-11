import bcrypt from "bcrypt";

export async function hashPass(pass: string): Promise<string> {
  return await bcrypt.hash(pass, 10);
}

export async function verifyPass(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}