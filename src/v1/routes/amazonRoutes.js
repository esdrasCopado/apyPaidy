const express = require('express')
const router = express.Router();

const amazoneController = require('../../controllers/amazonAWSController');

router
  .get('/files', amazoneController.getFile)
  .get('/',amazoneController.getAllUrlFiles)
  .get('/:key', amazoneController.getOneUrlFiles)
  .post('/files', amazoneController.postFile);

module.exports =router;
