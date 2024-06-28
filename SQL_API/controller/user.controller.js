const {
  create,
  getUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require("../services/user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  getUser: (req, res) => {
    const body = req.body;
    getUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  getUserById: (req, res) => {
    const user_id = req.query.user_id;
    getUserById(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  updateUser: (req, res) => {
    const user_id = req.query.user_id;
    const body = req.body;
    updateUser(user_id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  deleteUser: (req, res) => {
    const user_id = req.query.user_id;
    deleteUser(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.status(500).json({
          success: false,
          message: "User not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: results,
      });
    });
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;
    login(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Database connection error",
        });
      }
      if (!results) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      const isValidPassword = compareSync(password, results.password);
      if (isValidPassword) {
        results.password = undefined;
        const token = sign({ results }, "secrete", { expiresIn: "24h" });
        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: token,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    });
  },
};
