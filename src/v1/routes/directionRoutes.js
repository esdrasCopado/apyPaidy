const express = require('express');

const router = express.Router();
const directionsController = require('../../controllers/directionsController');

router
  .get("/",directionsController.getAllDirections)
  .get("/:directionID",directionsController.getUserDirection)
  .post("/",directionsController.createDirection)
  .patch("/:directionID", directionsController.updateDirection)
  .delete("/:directionID", directionsController.deleteDirection);

  module.exports = router;