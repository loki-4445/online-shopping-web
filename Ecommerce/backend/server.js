const express = require('express');
const app = express();
require('dotenv').config(); // To access environment variables

// Middleware to parse JSON bodies
app.use(express.json());

//cors 
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173' //to accept the request from any use '#'
}));

// Import the MongoDB client
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const mClient = new MongoClient(process.env.DB_URL);

mClient.connect()
    .then((connectionObj) => {
        console.log("Database connected");

        // Connect to the database
        const fsddb = connectionObj.db('pvpdb');

        // Connect to collections
        const productsCollection = fsddb.collection('products');
        const usersCollection = fsddb.collection('users');
        const cartCollection = fsddb.collection('cart'); // Added cart collection

        // Share the collections with the app
        app.set('productsCollection', productsCollection);
        app.set('usersCollection', usersCollection);
        app.set('cartCollection', cartCollection); // Set cart collection

        // Import the product and user APIs
        const productApi = require('./API/ProductApi');
        const userApi = require('./API/UserApi');

        // Use routers
        app.use('/product-api', productApi);
        app.use('/user-api', userApi);

        app.use('*', (req, res) => {
            res.send({ message: `Invalid path` });
        });

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database', err);
    });
