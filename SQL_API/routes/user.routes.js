const {
  createUser,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require("../controller/user.controller");
// const { loginUser } = require("../services/user.service");
const router = require("express").Router();

router.post("/create", createUser);
router.get("/getAll", getUser);
router.get("/get", getUserById);
router.put("/update", updateUser);
router.put("/delete", deleteUser);
router.post("/login", loginUser);

module.exports = router;
