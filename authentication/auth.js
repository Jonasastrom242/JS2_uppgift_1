const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

exports.generateToken = (user) => { //returnerar key från jwt, går att skicka all info men vi skickar bara id
    return jwt.sign({ id: user._id }, secretKey, { expiresIn: '3h'}) //sista är ett optionobjekt som gör att secretKey är giltig en timme
}

exports.verifyToken = (req, res, next) => { //middleware, när vi är klar används next för att gå vidare
     //Bearer token, 
     try {
        const token = req.headers.authorization.split(" ")[1]; //token blir skickad som Bearer token, vi gör därför en split för att komma åt bara token delen
        req.userData = jwt.verify(token, secretKey);
        
        next();
     } catch {
        return res.status(401).json({
            statusCode: 401,
            status: false,
            message: 'Access restricted. Please login'
        })
     }
}