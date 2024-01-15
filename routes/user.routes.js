const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserInfo,
  deleteUser,
} = require("../controllers/user.controller");
const { isAuth } = require("../utils/middleware");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);

router.get("/", isAuth, getAllUsers);
router.get("/:id", isAuth, getUserById);

router.patch("/:id", isAuth, updateUserInfo);

router.delete("/:id", isAuth, deleteUser);

module.exports = router;
