import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.post('/', TaskController.createTask);
router.get('/', TaskController.getAllTask);
router.get('/:userId', TaskController.getTasksByUser);
router.patch('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export const TaskRoutes = router;
