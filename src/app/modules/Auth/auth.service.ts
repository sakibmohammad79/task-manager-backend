import { generateTokens } from "../../../Helper/jwtHelper";
import prisma from "../../../Shared/prisma";
import bcrypt from 'bcrypt'

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const tokens = generateTokens({ userId: user.id, role: user.role });
  return { ...tokens };
};

export const AuthService = {
    loginUser
}