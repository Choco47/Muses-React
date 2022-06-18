import  express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import { readdirSync } from "fs";

// make a request to your server endpoint that endpoint you can see in the the Terminal
const morgan = require("morgan");
require("dotenv").config();

//express as a function that gives us all the functionality in app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE)
    .then(()=> console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error ", err));

// middlewares
// express for data to be accessible
app.use(express.json({limit: "5mb"}));

//cors for role base
app.use(
    cors({
        origin:[process.env.CLIENT_URL],
    })
);

//autoload routes
//read this folder using this function, then map through each of those files
readdirSync('./routes').map((r)=> app.use('/api', require(`./routes/${r}`)))

// listen
const port = process.env.PORT || 8000;
app.listen(port,() => console.log(`Server is running on port ${port}`));
