const express = require("express");
const mongoose =require('mongoose');

const PORT = process.env.PORT || 3002;
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser');
const router = require("../routes/senddata");


app.use(express.json());
app.use(cors());



mongoose.connect("mongodb+srv://singhvaibhav654:n0oIW74HIphNdQkZ@cluster0.vsomvuo.mongodb.net/test",
{useNewUrlParser:true}
);

mongoose.connection
.once("open",()=>console.log("Connected"))
.on("error",error=>{
  console.log("Your Error",error);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use('/api', router)
app.use('/data',router)
// app.use('/api',require('./routes/auth'));



// app.get("/", (req,res) => {
//   try {
//     res.status(200).send({msg : "got the /"})
//   } catch (error) {
//     res.status(400).send({error})
//   }
// })


app.get("/ap", (req, res) => {
    res.json({ message: "The Finhuntt" });
  });

  



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });

  
