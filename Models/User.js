const { default: mongoose } = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  user: String,
  pass: String,
  email: String,
});

module.exports = User;
