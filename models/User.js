const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});
//Encrypt password wih bcrypt
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const valid_time =
    Math.floor(Math.random() * process.env.JWT_EXPIRY_TIME_MAX) +
    +process.env.JWT_EXPIRY_TIME_MIN;
  const token = jwt.sign(
    { _id: user._id, valid_time },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * valid_time
    }
  );
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

// Search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
