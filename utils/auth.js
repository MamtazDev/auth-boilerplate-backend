require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  return jwt.sign(
    { name: user.name, email: user.email, _id: user?._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = { generateToken };
