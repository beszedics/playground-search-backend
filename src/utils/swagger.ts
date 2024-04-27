const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Playground search REST API Docs',
    description: 'Description',
  },
  host: 'localhost:8080/api/v1/docs',
};

const outputFile = './swagger-output.json';
const routes = ['../index.ts'];

swaggerAutogen(outputFile, routes, doc);
