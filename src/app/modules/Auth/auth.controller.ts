import { Request, Response } from 'express';
import { AuthService } from './auth.service';


;
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


export const AuthController = {
    loginUser
}
