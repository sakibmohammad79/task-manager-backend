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

export const UserController = {
    createUser
}