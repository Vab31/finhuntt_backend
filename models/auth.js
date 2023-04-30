const mongoose =require("mongoose");
const Schema =mongoose.Schema;
require('mongoose-type-url');

const userSchema = new Schema({
    email: String,
    password: String
  });
  
  const User = mongoose.model('User', userSchema);
  module.exports=User