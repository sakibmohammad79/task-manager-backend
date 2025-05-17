import { Request, Response } from 'express';
import { TaskService } from './task.service';


const createTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.createTask(req.body);
    res.status(201).json({ success: true, message: "Task created successfully!", data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create task', error: err });
  }
};
const getAllTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.getAllTask();
    res.status(201).json({ success: true, message: "Get All Task!", data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get task', error: err });
  }
};

const getTasksByUser = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getTasksByUser(req.params.userId);
    res.status(200).json({ success: true, message: "Get Task By User!", data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to get tasks', error: err });
  }
};

const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await TaskService.updateTaskStatus(req.params.id, req.body.status);
    res.status(200).json({ success: true, message: "Update Task Status!", data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update task', error: err });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  try {
    await TaskService.deleteTask(req.params.id);
    res.status(200).json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete task', error: err });
  }
};

export const TaskController = {
    createTask,
    getAllTask,
    getTasksByUser,
    updateTask,
    deleteTask
}
