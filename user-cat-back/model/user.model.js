const Mongoose = require('mongoose');
const UserModel  = new Mongoose.Schema(
    {
     firstName:{
        type: String,
        default:""
     },
     lastName:{
        type:String,
        default:""
     },
     phoneNumber:{
        type:String
     },
     email:{
        type:String,
        unique:true
     },
     image:{
      type:String
     },
     adminId:{
      type:String,
     },
     type:{
      type:String
     },
     isDeleted:{
        type:Boolean,
        default:false
     }
},{timestamps:true});

module.exports = Mongoose.model("UserSchema",UserModel);
