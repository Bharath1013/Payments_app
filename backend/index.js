// backend/index.js
const express = require('express');
require('dotenv').config();
const cors = require("cors");
const rootRouter = require("./routes/index"); 
const app = express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{res.json({message:"hello WORLD"})})

app.use("/api/v1", rootRouter);

app.listen(3000); 