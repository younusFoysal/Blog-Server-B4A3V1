import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

const gethome = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Blog Server is Running...',
  });
};
app.get('/', gethome);


app.use(globalErrorHandler);
//Not Found
app.use(notFound);



export default app;
