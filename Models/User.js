const { default: mongoose } = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  pass: String,
  login: Boolean,
});

module.exports = User;
