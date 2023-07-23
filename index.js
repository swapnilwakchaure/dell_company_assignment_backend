require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const { authRoute } = require('./routes/authRoute');
const { productRoute } = require('./routes/productRoute');
const { connection } = require('./connection/db');


const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));



app.get('/', (request, response) => {
    response.send('welcome to ticket reservation backend system');
});

app.use('/auth', authRoute);
app.use('/product', productRoute);



app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
        console.log(`Cannot able to start the server: ${error}`);
    }
});