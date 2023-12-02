# GoIt Wallet (backend repo) by FinanSync Team

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [License](#license)
- [Authors](#authors-in-alphabetical-order)

## Project Overview

This backend component is part of a budget management application designed to handle user registration, authentication, and budget-related operations. It provides RESTful APIs to support the frontend functionalities.

### Technologies Used

- **Node.js:** The runtime environment for executing JavaScript code on the server side.
- **Express.js:** A web application framework for Node.js, simplifying the creation of APIs.
- **MongoDB:** A NoSQL database used for storing user data and budget-related information.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.

### Setup Instructions

1. **Clone the Repository:**

   [HTTP link](#https://github.com/Piotrek92PL/GoIT-Wallet-Backend.git)

   [SSH](#git@github.com:Piotrek92PL/GoIT-Wallet-Backend.git)

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

4. **Scripts**

- `start`: `node src/server.js`

  - Start the server.

- `dev`: `nodemon src/server.js`
  - Start the server with nodemon for development (auto-restart on file changes).
    [Back to top](#goit-wallet-backend-repo-by-finansync-team)

[Back to top](#goit-wallet-backend-repo-by-finansync-team)

## API Endpoints

Check out Swagger documentation at endpoint "/api-docs"

[Back to top](#goit-wallet-backend-repo-by-finansync-team)

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt) v5.1.1
  - Library for hashing passwords.
- [cors](https://www.npmjs.com/package/cors) v2.8.5

  - Middleware for enabling Cross-Origin Resource Sharing.

- [dotenv](https://www.npmjs.com/package/dotenv) v16.3.1

  - Zero-dependency module that loads environment variables from a `.env` file.

- [express](https://www.npmjs.com/package/express) v4.18.2

  - Web framework for Node.js.

- [modern-normalize](https://www.npmjs.com/package/modern-normalize) v2.0.0

  - A modern alternative to CSS resets.

- [mongoose](https://www.npmjs.com/package/mongoose) v8.0.2

  - MongoDB object modeling tool designed to work in an asynchronous environment.

- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc) v6.2.8

  - A library that allows you to integrate Swagger using JSDoc comments.

- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) v5.0.0

  - Middleware to serve Swagger UI directly from your Express server.

  [Back to top](#goit-wallet-backend-repo-by-finansync-team)

## Development Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon) v3.0.1
  - Utility that monitors for changes in your source code and automatically restarts your server.
    [Back to top](#goit-wallet-backend-repo-by-finansync-team)

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

[Back to top](#goit-wallet-backend-repo-by-finansync-team)

## Authors (in alphabetical order)

- [@Astrix1234](https://github.com/Astrix1234)
- [@karolinakiljanska](https://github.com/karolinakiljanska)
- [@Joanna-Jasinska](https://github.com/Joanna-Jasinska)
- [@pawelszopinski](https://github.com/pawelszopinski)
- [@Piotrek92PL](https://github.com/Piotrek92PL)

[Back to top](#goit-wallet-backend-repo-by-finansync-team)
