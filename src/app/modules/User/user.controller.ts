import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try{
    const user = await UserService.createUserIntoDB(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully!",
        data: user,
    })
    }
    catch(err: any){
        res.status(500).json({
            success: false,
            message: "Something went wront!",
            error: err,
        })
    }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getAllUser();
    res.status(201).json({ success: true, message: "Get All User!", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get user', error: err });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserService.getUserByID(req.params.userId);
    res.status(200).json({ success: true, message: "Get Task By User!", data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get user', error: err });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const task = await UserService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, message: "Update user data!", data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update user', error: err });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.status(200).json({ success: true, message: 'user deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error: err });
  }
};

export const UserController = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}