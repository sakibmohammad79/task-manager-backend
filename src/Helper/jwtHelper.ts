import { JwtPayload, Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import ApiError from '../app/Error/ApiError';
import status from 'http-status';

export const generateToken = async (
  jwtPayload: JwtPayload,
  secret: Secret,
  expiresIn: string
) => {
  return  jwt.sign(jwtPayload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
};

export const verifyToken = async (token: string, secret: Secret) => {
  try {
    const decodedData = jwt.verify(token, secret) as JwtPayload;
    return decodedData;
  } catch {
    throw new ApiError(status.FORBIDDEN, "You are not authorized!");
  }
};


