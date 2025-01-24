require("dotenv").config();
const express=require("express");
const bodyParser = require("body-parser");
const cors=require("cors");
const fs = require("fs");
const connect=require("./utils/db");
const emailRoutes=require("./routes/email.route");
const port=process.env.PORT;
const path = require('path');

const app=express();

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname,'dist')));
app.use(cors());

// routes middlewares
app.use(emailRoutes);

//server starting
connect().then(() => {
    app.listen(port,()=>{
        console.log("Email Template Builder server is running");
    });
})
