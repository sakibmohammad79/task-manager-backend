import { User } from "@prisma/client"
import prisma from "../../../Shared/prisma"
import bcrypt from 'bcrypt'


const createUserIntoDB = async(payload: User) => {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

   
   
    const createUser = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        }
    })

    return createUser;
}

export const UserService = {
    createUserIntoDB
}