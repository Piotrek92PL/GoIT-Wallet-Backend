# Backend README

## Project Overview

This backend component is part of a budget management application designed to handle user registration, authentication, and budget-related operations. It provides RESTful APIs to support the frontend functionalities.

### Technologies Used

- **Node.js:** The runtime environment for executing JavaScript code on the server side.
- **Express.js:** A web application framework for Node.js, simplifying the creation of APIs.
- **MongoDB:** A NoSQL database used for storing user data and budget-related information.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.

### Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

Create a .env file in the root of the backend directory and define the following variables:

   ```bash
  PORT=3000
  DB_URI='your-mongodb-uri'
  DB_NAME='your-database-name'
  SECRET='your-jwt-secret'

   ```

   Replace 'your-mongodb-uri' with the connection URI for your MongoDB database and 'your-jwt-secret' with a secret key for JWT.

4. **Run the app**

```bash
npm start
```
### API Endpoints

Check out Swagger documentation at endpoint "/api-docs

[Back to top](#backend-readme)