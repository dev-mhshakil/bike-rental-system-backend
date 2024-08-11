import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorhandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

// parsers

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1');

const test = async (req: Request, res: Response) => {
  res.send('Welcome to the server');
};

app.get('/', test);

app.use(globalErrorhandler);

app.use(notFound);

export default app;
