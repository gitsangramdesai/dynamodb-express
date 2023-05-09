var express = require('express');
var router = express.Router();
const UserController = require('../controller/user.controller');

router.get(`/`, UserController.findAll);
router.get(`/:UserID/:UserName`, UserController.findByID);
router.post(`/`, UserController.create);
router.patch(`/:UserID`, UserController.update);
router.delete(`/:UserID/:UserName`, UserController.deleteByID);
router.post(`/findByEmail`, UserController.findByEmail);
router.post(`/login`, UserController.login);
router.post(`/findByName`, UserController.findByName);



module.exports = router;
