import { User } from "@prisma/client"
import prisma from "../../../Shared/prisma"


const createUserIntoDB = async(payload: User) => {
    const createUser = await prisma.user.create({
        data: payload
    })

    return createUser;
}

export const UserService = {
    createUserIntoDB
}