const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
  regNo: {
    type: Number,
    //  require: true,
    //  unique: true
  },
  name: {
    type: String,
    //   require: true,
    //   unique: true,
  },
  email: {
    type: String,
    //   require: true,
    //   unique: true,
  },
  password: {
    type: String,
    //  require: true
  },
  doctors:{
    type:String
  }
});




module.exports = mongoose.model("Admin", adminSchema);