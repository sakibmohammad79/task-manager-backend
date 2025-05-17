import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.post('/create-task', TaskController.createTask);
router.get('/', TaskController.getAllTask);
router.get('/:userId', TaskController.getTasksByUser);
router.patch('/update/:id', TaskController.updateTask);
router.delete('/delete/:id', TaskController.deleteTask);

export const TaskRoutes = router;
