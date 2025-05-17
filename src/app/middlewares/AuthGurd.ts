import { NextFunction, Request, Response } from "express";

import ApiError from "../Error/ApiError";
import status from "http-status";
import { verifyToken } from "../../Helper/jwtHelper";

const Guard = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      // console.log(token);
      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "You are not authorized!");
      }
      const decodedData = await verifyToken(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      );

      req.user = decodedData;

      if (roles.length && !roles.includes(decodedData.role)) {
        throw new ApiError(status.FORBIDDEN, "You are not authorized!");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default Guard;
