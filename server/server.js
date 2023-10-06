const express = require("express");
const db = require("mongoose");
const cors = require("cors");
const api = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;
const uri = "mongodb+srv://yaswanthkumara:yaswanthkumara@cluster0.fqa1x9h.mongodb.net/?retryWrites=true&w=majority";

app.use(cors());

app.use(express.json());
app.use(api);

db.connect(uri).then(()=>(
    console.log("Mongo connected!")
)).catch((err)=>console.error(err));

app.listen(PORT,()=>{
    console.log("success!");
});

