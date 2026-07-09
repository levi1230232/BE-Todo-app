import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Todo App REST API",
    },

    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Nguyen Van A",
            },
            email: {
              type: "string",
              example: "admin@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "admin@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        Todo: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Learn NodeJS",
            },

            completed: {
              type: "boolean",
              example: false,
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
// console.log(swaggerSpec.paths);

export { swaggerUi, swaggerSpec };
