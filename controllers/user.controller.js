const User = require("../models/user.model");
const { generateToken } = require("../utils/auth");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const isExist = await User.findOne({ email: req.body.email });

    if (isExist) {
      return res.status(403).send({
        message: `${req.body.email} is already Exist!`,
        success: false,
      });
    } else {
      const { firstName, lastName, email, phoneNumber, gender } = req.body;
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: bcrypt.hashSync(req.body.password),
        phoneNumber: phoneNumber,
        gender: gender,
      });

      const user = await newUser.save();
      const token = await generateToken(user);
      res.status(200).send({
        message: "Account created  successfully",
        success: true,
        user,
        accessToken: token,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({
        success: false,
        type: "email",
        message: "User not found",
      });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = await generateToken(user);
      return res.status(200).send({
        success: true,
        message: "Logged in successfully",
        user: removeSensitiveInfo(user),
        accessToken,
      });
    } else {
      res.status(401).send({
        success: false,
        type: "password",
        message: "Invalid password",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 }).select("-password");
    res.status(200).send({
      data: users,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("User Not Found");
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { ...info } = req.body;

    const isExist = await User.findOne({ _id: req.user._id });

    if (isExist) {
      const result = await User.findByIdAndUpdate(
        { _id: req.params.id },
        info,
        {
          new: true,
        }
      );
      res.status(200).json({
        success: true,
        message: "User Info Update successfully",
        data: result,
      });
    } else {
      res.status(201).json({
        success: false,
        message: "Update unsuccessful",
      });
    }
  } catch (error) {
    res.status(201).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .exec()
      .then((result) => {
        res.status(200).send({
          message: `${result.name} is successfully removed!`,
          data: result,
          success: true,
        });
      })
      .catch((err) => {
        res.send({
          message: err.message,
          success: false,
        });
      });
  } catch (err) {
    res.status(500).send({
      message: err.message,
      success: false,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserInfo,
  deleteUser,
};
