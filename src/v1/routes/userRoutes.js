const express = require('express');

const router = express.Router();
const userController = require('../../controllers/userController');

router
  .get("/",userController.getAllUsers)
  .get("/:userID",userController.getOneUser)
  .post("/",userController.createUser)
  .post("/singIn",userController.signInUser)
  .post("/emailDuplicate",userController.emailDuplicate)
  .patch("/:userID", userController.updateUser)
  .delete("/:userID", userController.deleteUser);

  module.exports = router;
