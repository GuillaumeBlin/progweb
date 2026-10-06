import express from 'express';
import morgan from 'morgan'
import router from './routes.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(router);

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Server is running ...`);
});
