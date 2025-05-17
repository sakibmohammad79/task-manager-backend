import { Router } from "express";
import { UserRoutes } from "../app/modules/User/user.routes";
import { TaskRoutes } from "../app/modules/Task/task.routes";
import { AuthRoutes } from "../app/modules/Auth/auth.routes";

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
    {
        path: '/auth',
        route: AuthRoutes
    },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;