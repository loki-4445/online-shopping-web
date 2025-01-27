  const express = require('express');
  const ProductsApp = express.Router();
  const expressAsyncHandler = require('express-async-handler');
  const { JsonWebTokenError } = require('jsonwebtoken');
  const tokenVerification=require('../middlewares/tokenVerify')
  // Middleware 1
  // const middleware1 = (req, res, next) => {
  //     console.log("Middleware-1 executed");
  //     next();
  // }

  // Middleware 2
  // const middleware2 = (req, res, next) => {
  //     console.log("Middleware-2 executed");
  //     next();
  // }

  // Using middlewares
  // productApp.use(middleware1);
  // productApp.use(middleware2);

  //for creating the obj for jsonwebtokn
  const jwt=require('jsonwebtoken')

  // Posting data
  ProductsApp.get('/products',expressAsyncHandler (async(req, res) => {
      // Get products collection obj
      let productsCollection=req.app.get('productsCollection')
      // Get the products data from collection
      let productList=await productsCollection.find().toArray()
      // Send products data to client
      res.send({message:'products',payload:productList})
    
    }));


  // Read by ID
  ProductsApp.get('/products/:id', expressAsyncHandler(async(req, res) => {
    let productsCollection= req.app.get('productsCollection');
    let productID = Number(req.params.id);
    let product=await productsCollection.findOne({id:productID});
    res.send({message:'product',payload:product})
  }));


  module.exports = ProductsApp;