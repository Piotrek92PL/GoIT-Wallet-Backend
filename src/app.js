import express from "express";
// import logger from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import transactionRouter from "#routes/transactionRoutes.js";
import categoryRouter from "#routes/categoryRoutes.js";
import dotenv from "dotenv";
import "#config/config-passport.js";
import routerUsers from "#routes/routerUsers.js";

const app = express();
dotenv.config();

// app.use(logger(formatsLogger));
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "GoIT Wallet by FinanSync Team",
      version: "1.0.0",
      description: "Personal budget app",
    },
  },
  apis: ["src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //shows Swagger documentation

app.use("/api/transactions", transactionRouter);
app.use("/api/category", categoryRouter);
app.use("/api/users", routerUsers);

// Error handling

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).json({
    message: `Address not found. Go to http://localhost:${PORT}/api/transactions`,
  });
});

app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  res.status(500).json({ message: err.message });
});

export default app;
