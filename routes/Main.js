const router = require("express").Router();

const { Router } = require("express");
const FrontController = require("../Controllers/FrontendController");
const { UserController } = require("../Controllers/FrontendController");

router.get("/", FrontController.index);
router.post("/signup", UserController.signup);

module.exports = router;
