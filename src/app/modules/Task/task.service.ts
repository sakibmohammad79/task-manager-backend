import { TaskStatus } from "@prisma/client";
import prisma from "../../../Shared/prisma"

const createTask = async (data: {
  title: string;
  description: string;
  userId: string;
}) => {
  const task =  await prisma.task.create({
    data,
  });

  return task;
};

const getAllTask = async() => {
    const allTask = await prisma.task.findMany();
    return allTask
}

const getTasksByUser = async (userId: string) => {
  return await prisma.task.findMany({
    where: { userId },
  });
};

const updateTaskStatus = async (id: string, status: string) => {
  return await prisma.task.update({
    where: { id },
    data: { status: TaskStatus.COMPLETED },
  });
};

const deleteTask = async (id: string) => {
  return await prisma.task.delete({
    where: { id },
  });
};


export const TaskService = {
    createTask,
    getAllTask,
    getTasksByUser,
    updateTaskStatus,
    deleteTask
}