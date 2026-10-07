import express from 'express';
import morgan from 'morgan'

import connectDB from "./config/db.js";
import routes from './routes/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

const port = 80;


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contact REST API',
            description: "A REST API built with Express and MongoDB.",
            version: '0.1',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Contact: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' },
                        age: { type: 'number' },
                    },
                },
            },
        },
        servers: [
            {
                url: `http://localhost:80/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}



const app = express();
app.use(morgan('dev'))
app.use(express.json());
connectDB();

const openapiSpecification = swaggerJsDoc(options);
app.use('/docs', serve, setup(openapiSpecification));

app.use('/api', routes);

app.get('/', function(req, res) {
    res.send('Hello !');
});

app.listen(port, () => {
    console.log("Server is running");
});
