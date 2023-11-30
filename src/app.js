import express from "express";
// import logger from "morgan";
import cors from "cors";
import transactionRouter from "#routes/transactionRoutes.js";
import dotenv from "dotenv";
// import "#config/passport.js";

const app = express();
dotenv.config();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRouter); //returns [] list of all transactions

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.status(404).json({
    message: `Address not found. Go to http://localhost:${PORT}/api/transactions`,
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
