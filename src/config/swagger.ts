import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Image Processing API',
      version: '1.0.0',
      description: 'API for image enhancement, generation, background removal, and text generation',
    },
    components: {
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options); 