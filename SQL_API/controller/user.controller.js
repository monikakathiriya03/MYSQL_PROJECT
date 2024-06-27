const { create, getUser, getUserById, updateUser, deleteUser, loginUser } = require('../services/user.service');
const { genSaltSync, hashSync } = require('bcrypt');

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
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },

  getUser : (req, res) =>{
    const body = req.body;
    getUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if(!results){
        return res.status(500).json({
          success: false,
          message: "User not found"
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },

  getUserById : (req, res) =>{
    const user_id = req.query.user_id;
    getUserById(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
        if(!results){
          return res.status(500).json({
            success: false,
            message: "User not found"
          });
        }
        return res.status(200).json({
          success: true,
          data: results
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
      if(!results){
        return res.status(500).json({
          success: false,
          message: "User not found"
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },

  deleteUser:  (req, res) => {
    const user_id = req.query.user_id;
    deleteUser(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if(!results){
        return res.status(500).json({
          success: false,
          message: "User not found"
        });
      }
      return res.status(200).json({
        success: true,
        data: results
      });
    });
  },

};
