const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: true,
   },
   email: {
      type: String,
      require: true,
      unique: true,
   },
   address: {
      type: String,
      require: true,
      unique: true,
   },
   mobile: {
      type: Number,
      require: true,
      unique: true,
   },
   weight: {
      type: Number,
      require: true,
      unique: true,
   },
   dob: {
      type: String,
      require: true,
      unique: true,
   },
   height: {
      type: Number,
      require: true,
      unique: true,
   },
   sex: {
      type: String,
      require: true,
      unique: true,
   },
   bloodgroup: {
      type: String,
      require: true,
      unique: true,
   },
   password: {
      type: String,
      require: true
   },
   appointments: [{ regNo: String, slot: String }],
   hash_password: {
      type: String,
      require: true
   },
   confirm: {
      type: [
         {
            confirm: { type: Boolean, required: true },
            regNo: { type: Number, required: true }
         }
      ],
      default: []
   },
   link: [
      {
         link: { type: String, required: true }, // URL of the link
         regNo: { type: Number, required: true } // Registration number
      }
   ],
   medicines: {
      type: [[{
         regNo: { type: Number, required: true },
         name: { type: String, required: true },
         type: { type: String, required: true },
         description: { type: String, required: true }
      }]],
      default: [] // Initialize as an empty array
   },
}, { timestamps: true });
//For get fullName from when we get data from database

// userSchema.virtual("fullName").get(function () {
//   return `${this.firstName} ${this.lastName}`;
// });

userSchema.method({
   async authenticate(password) {
      return bcrypt.compare(password, this.password);
   },
});
module.exports = mongoose.model("User", userSchema);