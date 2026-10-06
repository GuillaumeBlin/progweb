import express from 'express';
import connectDB from "./config/db.js";
import routes from './routes/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

process.loadEnvFile();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8080;


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
                url: `http://${host}:${port}/api`,
                description: 'Development server',
            },
        ],
    },
    apis: ["./src/routes/*.js"],
}



const app = express();
app.use(express.json());
connectDB();

const openapiSpecification = swaggerJsDoc(options);
app.use('/docs', serve, setup(openapiSpecification));

app.use('/api', routes);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
