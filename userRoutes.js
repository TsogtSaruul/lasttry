const express = require("express");
const { signin, signup } = require("./userControllers");

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
