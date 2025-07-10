const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger').default;
const morgan = require('morgan');
const connectDB = require('./config/db');

//Route files
const bootcamps = require('./routers/bootcamps');

// load env variables
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

const app = express();
// app.use(logger);

// Body Parser
app.use(express.json());

//Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise)=> {
    console.log(`Error: ${err.message}`);
    //Close the server and exit the process
    server.close(()=> process.exit(1));
});