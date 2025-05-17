import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import status from 'http-status';



 const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const {  accessToken, refreshToken } = await AuthService.loginUser(email, password);
     res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
    res.status(200).json({
      success: true,
      message: "User login successfully",
      data: {accessToken}
    });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
};
 const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
    res.status(status.OK).json({
      success: true,
       message: "generate re-access token successfully!",
      data: result
    });
  } catch (err: any) {
    res.status(401).json({ success: false, message: err.message });
  }
};


export const AuthController = {
    loginUser,
    refreshToken
}
