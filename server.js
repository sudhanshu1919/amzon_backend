const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const products = require('./products');
const Products2 = require("./Products2");

const app = express();

const port = 3001;

// meddlwares
app.use(express.json());
app.use(cors());

// i have connection url to mongoDB data base

const connection_url =
  "mongodb+srv://sudhanshugaikwad07:sudhanshugaikwad07@cluster0.3u1qukz.mongodb.net/Amazon?retryWrites=true&w=majority";

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Your Databse is connected to mongoDB..!"));

// API
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Add Product in Databases

// app.post('/products/add', (req, res) => {
//   const productsDetail = req.body;

//   //  test Data
//   console.log(productsDetail);

//   Products2.create(productsDetail, (err,data) =>{
//     if(err) {
//       res.status(500).send(err.massage);
//     } else{
//       res.status(201).send(data);
//     }
//   })

// });

app.post("/products/add", async (req, res) => {
  try {
    const productsDetail = req.body;

    // Log the product details for testing
    // console.log(productsDetail);

    // Use await to create the product and store the result in 'data'
    const data = await Products2.create(productsDetail);

    // Respond with the newly created product data
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// This Api Get Data from the Database and Show all product on the home page
app.get("/products/get", async (req, res) => {
  try {
    const products = await Products2.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.post('/signUp', async  (req , res) =>{
//   try{

//     const {name,email,password} = req.body;
//     if(!name || !email || !password){
//       return res.status(422).json({error:"Plase add all the fields"})
//    }else{
//        res.json({massage:"User registered succesfully..!"})
//    }

//   }catch (error){

//   }
// })

// API for Payment

app.post("payment/create");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
