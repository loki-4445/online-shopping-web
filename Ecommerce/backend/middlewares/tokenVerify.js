const jwt = require('jsonwebtoken');

const tokenVerification = (req, res, next) => {
    // Get bearer token from 'headers' property of req object
    const bearerToken = req.headers.authorization;
    console.log(bearerToken)
    // If bearer token not found
    if (!bearerToken) {
        return res.status(401).send({ message: 'Unauthorized access' });    
    }
    
    // Extract the token from the bearer token
    const token = bearerToken.split(" ")[0];
   // console.log(token)
    // Check if token exists
    if (!token) {
        return res.status(401).send({ message: 'Token not provided' });
    }

    // Verify the token
    try {
        let decoded = jwt.verify(token,process.env.SECRET_KEY);
        // Optionally pass decoded token to the next middleware
        req.user = decoded; 
        next();
    } catch (err) {
        console.error(err)
        res.status(401).send({ message: 'Token expired or invalid. Please re-login' });
    }
}

module.exports = tokenVerification;
