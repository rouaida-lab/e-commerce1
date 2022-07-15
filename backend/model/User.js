const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true, 'please provide first name'],
        maxlength:70,
        minlength:4,
    },

    // verification de email 
    email: {
        type: String,
        required: [true, 'please provide email'],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please provide valide email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        match:[/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'please provide valid password']
        //match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'please provid strengt password'],
    },
    confirmPassword: {
        type: String,
        required: [true, 'please provide the same password'],
        match:[/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'please provide valid password']
        //match:[/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'please provid strengt password'],
    },
    //length and number??
    phone: {
        type: String,
        required: [true, 'please provide phone number'],
        minlength: 8,
        maxlength: 8,

    },
    adress: {
        type: String,
        required: [true, 'please provide an adress'],
   

    },
       
},
{ timestamps: true }
)

UserSchema.pre('save', async function (){
    const salt =await bcrypt.genSalt(10)
    this.password= await bcrypt.hash(this.password, salt)
    this.confirmPassword= await bcrypt.hash(this.confirmPassword, salt)

})
UserSchema.methods.createJWT = function(){
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_LIFETIME,
})}

UserSchema.methods.comparePassword = async function (condidatePassword){
    const isMatch = await bcrypt.compare(condidatePassword, this.password)
    return isMatch
}


module.exports = mongoose.model('User', UserSchema)