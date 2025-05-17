import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post('/create-user', UserController.createUser);
router.get('/', UserController.getAllUser);
router.get('/:userId', UserController.getUserById);
router.patch('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

export const UserRoutes = router;