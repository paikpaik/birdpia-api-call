const express = require("express");
const { test } = require("../controllers/index");
const router = express.Router();

router.get("/test", test);

module.exports = router;
