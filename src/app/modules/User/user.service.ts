import { User } from "@prisma/client"
import prisma from "../../../Shared/prisma"
import bcrypt from 'bcrypt'


const createUserIntoDB = async(payload: User) => {
    
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
        throw new Error('Email already exists!');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const createUser = await prisma.user.create({
        data: {
            ...payload,
            password: hashedPassword
        }
    })

    return createUser;
}


const getAllUser = async() => {
    const allUser = await prisma.user.findMany();
    return allUser
}

const getUserByID = async (id: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id },
  });
};

const updateUser = async (id: string, payload: string) => {
  return await prisma.user.update({
    where: { id },
    data: payload,
  });
};

const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const UserService = {
    createUserIntoDB,
    getAllUser,
    getUserByID,
    deleteUser,
    updateUser
}