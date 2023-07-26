const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path')

const user_routes = require('./routes/users.js')

const cookieParser = require('cookie-parser');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
// app.use('/', express.static('frontend'))

app.listen(process.env.PORT, () => {
    console.log(`run on ${process.env.PORT}`);
})

app.use(user_routes.router)

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "frontend/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

