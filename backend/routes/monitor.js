const express = require("express");

const {
  healthCheck
} = require("../controllers/monitor");

const router = express.Router()

router.get("/healthCheck", healthCheck);

module.exports = router