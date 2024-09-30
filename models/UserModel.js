const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // role:{
  //   type:String
  // },
  cart:[{   //id used here is id of the product
    id:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:"products"  
    },
    quantity:{
      type:Number
    }
  }]
});

module.exports = mongoose.model("user", UserSchema);

let users = [{"username":"Mansi","password":"12345","cart":[]},{"username":"Aashutosh","password":"98765","cart":[]},{"username":"showoff","password":"aashu","cart":[]}]

