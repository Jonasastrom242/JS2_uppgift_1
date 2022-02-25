const User = require('./userSchema');
const bcrypt = require('bcryptjs');
const userSchema = require('./userSchema');
const auth = require('../../authentication/auth');

exports.registerUser = (req, res) => {
    User.exists({ email: req.body.email }, (err, result) => {
        if(err) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                message: 'You made a bad request',
                err
            })
        }
        
        if(result) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                message: 'The email is already taken',
                
            })
        }
        const salt = bcrypt.genSaltSync(10) //gör klart innan den går  vidare (syncron)

        bcrypt.hash(req.body.password, salt, (err, hash) => { //ger ett promise tillbaka(hashad version av lösen), kör callback
            if(err) {
                return res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Failed to encrypt the password',
                    err
                })
            }
            User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                passwordHash: hash
            })
            .then(user => {
                res.status(201).json({
                    statusCode: 201, 
                    status: true,
                    message: 'User was created successfully',
                    token: auth.generateToken(user)
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Failed to create user',
                    err
                })
            })
        }) 
    })
}

exports.loginUserWithEmailAndPassword = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {

        if(err) {
            return res.status(400).json({
                statusCode: 400,
                status: false,
                message: 'You made a bad request',
                err
            })
        }
        if(!user) {
            return res.status(401).json({
                statusCode: 401,
                status: false, 
                message: 'Incorrect email or password'
            })
        }

        bcrypt.compare(req.body.password, user.passwordHash, (err, result) => { //jämför det krypterade lösenordet med det i DB
            
            if(err) {
                return res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Something went wrong when decrypting the password',
                    
                })
            }
            if(!result) { //om lösen inte matchar(är false)
                return res.status(401).json({
                    statusCode: 401,
                    status: false,
                    message: 'Incorrect email or password',
                })    
            }

            res.status(200).json({
                statusCode: 200,
                status: true,
                message: 'Authentication was successful',
                token: auth.generateToken(user)
            })
        }) 

    })

}