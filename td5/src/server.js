import express from 'express';
import connectDB from "./config/db.js";
import routes from './routes/index.js';

process.loadEnvFile();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;

const app = express();
connectDB();

app.use('/api', routes);

  app.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`)
  });