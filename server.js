const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const app = express();

const connectDB = require('./server/database/connection')

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 8080;

//log request
app.use(morgan("tiny"));

//mongodb connection 

connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");

//if view directory name change
// app.set("views" , path.resolve(__dirname , 'views/ejs'))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load Rotes
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => console.log(`server start http://localhost:${PORT}`));
