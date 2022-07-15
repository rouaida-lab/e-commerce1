const User = require('../model/User')
const jwt = require('jsonwebtoken')
const{ UnauthenticatedError } = require('../errors')

const auth = async (req , res, next)=>{
    //check header
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(" ")[1]
    
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        //attach the user to tha job routes
        //const user = User.findById(payload.id).select('-password')
        //req.user = user
        req.user ={ userId: payload.userId}
        next()
    }catch(error){
        throw new UnauthenticatedError('Authentication invalid1')

    }
}
module.exports = auth;