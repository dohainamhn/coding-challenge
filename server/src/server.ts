import express from 'express';
import router from './routers';
import Mongodb from './utils/mongoDb';
import cors from 'cors';

const bootstrapServer = async () => {
  const app = express();

  const PORT = process.env.PORT || 4200;
  const corsOptions = {
    origin: 'http://localhost:3000',
  };
  const db = new Mongodb();
  await db.connect();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use('/api', router);

  app.listen(PORT, () => {
    console.log(`server listening ar port ${PORT}`);
  });
};

bootstrapServer();
