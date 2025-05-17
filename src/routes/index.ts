import { Router } from "express";
import { UserRoutes } from "../app/modules/User/user.routes";
import { TaskRoutes } from "../app/modules/Task/task.routes";

const router = Router();


const moduleRoutes = [
    {
        path: '/user',
        route: UserRoutes
    },
    {
        path: '/task',
        route: TaskRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;