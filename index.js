var express = require('express');
const app = express();
const morgan = require('morgan')

const users = require('./routes/users')

require('dotenv').config();

app.use(express.json());
app.use(morgan('dev'))
app.use('/user',users);

const PORT = process.env.DB_PORT || 2022

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});

