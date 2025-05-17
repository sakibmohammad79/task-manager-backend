import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { UserController } from './app/modules/User/user.controller';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.post('/user/create-user', UserController.createUser)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!");
})

export default app;