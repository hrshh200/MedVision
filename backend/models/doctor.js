const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const doctorSchema = new mongoose.Schema({
  regNo:{
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
  hash_password: {
     type: String,
   //   require: true
  },
},{ timestamps: true });
//For get fullName from when we get data from database

// userSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

doctorSchema.method({
  async authenticate(password) {
     return bcrypt.compare(password, this.password);
  },
});
module.exports = mongoose.model("Doctor", doctorSchema);