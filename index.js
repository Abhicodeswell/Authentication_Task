const express = require('express');
const app = express();
const cors= require('cors');
const bodyParser = require('body-parser');
const connectDb = require('./databaseconn');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/",require("./Routes/login_registerRoutes"));

// Start the server
app.listen(PORT,'0.0.0.0',()=>{
console.log(`Server is running on http://localhost:${PORT}`);
});