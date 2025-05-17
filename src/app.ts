import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import router from './routes';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send("Task Management Project Is Running!");
})

export default app;