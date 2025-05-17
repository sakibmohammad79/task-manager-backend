import { Secret } from "jsonwebtoken";
import { generateToken, verifyToken, } from "../../../Helper/jwtHelper";
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
  const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
  const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';


  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };
   const accessToken = await generateToken(
    jwtPayload,
    ACCESS_SECRET as Secret,
    '1h'
  );
  //generate refreshToken
  const refreshToken = await generateToken(
    jwtPayload,
   REFRESH_SECRET as Secret,
    '7d'
  );
  return { accessToken, refreshToken };
};

const refreshToken = async (refreshToken: string) => {
    const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
    const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';
  const decodedData = await verifyToken(
    refreshToken,
    REFRESH_SECRET as string
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
    },
  });

 

  const jwtPayload = {
    userId: userData.id,
    email: userData.email,
    role: userData.role,
  };
  //generate access token
  const accessToken = await generateToken(
    jwtPayload,
    ACCESS_SECRET as Secret,
    '1h' as string
  );

  return { accessToken };
};

export const AuthService = {
    loginUser,
    refreshToken
}