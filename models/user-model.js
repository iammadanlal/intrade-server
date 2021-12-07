const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brcypt = require("bcrypt");
const { isEmail } = require("validator");

var userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: [true, "Name is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      lowercase: true,
      unique: true,
      validate: [isEmail, "Please enter valid email."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  {
    timestamps: true,
  }
);

//Hashing password
userSchema.pre("save", async function (next) {
  const salt = await brcypt.genSalt();
  this.password = await brcypt.hash(this.password, salt);
  next();
});

//Static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await brcypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("User", userSchema);
module.exports = User;
