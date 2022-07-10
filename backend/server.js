// installing modules 
const express = require('express');
const app = express();

const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');

// Importing files 
const feesRouter = require('./routes/feesRoute');
const connectDatabase = require('./config/db');
const errorMiddleware = require('./middleware/errors')
const ErrorHandler = require('./utils/errorHandler');

// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

// Connecting to databse
connectDatabase();


// Set up body parser 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
// Setup cors to manage different ports 
app.use(cors());



app.use(feesRouter);

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);


// App should listen on the PORT for dev and prod
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});


// Handling Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled promise rejection.')
    server.close( () => {
        process.exit(1);
    }) 
});