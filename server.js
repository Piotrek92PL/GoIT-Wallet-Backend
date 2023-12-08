import app from "./src/app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uri = process.env.DB_URI;
const db = process.env.DB_NAME;
const connection = mongoose.connect(uri, {
  dbName: db,
});

connection
  .then(() => {
    app.listen(PORT, async () => {
      console.log("-------------------------------------------------");
      console.log(
        `Database connection successful. Use our API on port: ${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("-------------------------------------------------");
    console.log(`Server not running: ${err.message}`);
    process.exit(1);
  });

  function handleDatabaseConnectionError(err) {
    if (err.name === 'MongoNetworkError') {
      console.error(
        'Network error while connecting to the database. Please check your connection settings.'
      );
    } else if (err.name === 'MongoTimeoutError') {
      console.error(
        'Connection to the database timed out. Please check your connection and the status of your database server.'
      );
    } else {
      console.error(`An error occurred while connecting to the database: ${err.message}`);
    }
  }