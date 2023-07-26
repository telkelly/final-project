const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const user_routes = require('./routes/users.js')

const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static('frontend'))

app.listen(process.env.PORT, () => {
    console.log(`run on ${process.env.PORT}`);
})

app.use(user_routes.router)