const express = require("express");
const router = express.Router();

const { myPage, createMyPage } = require("../controllers/pageController");

const { authProtect } = require("../middleware/authProtect");
// const upload = require("../middleware/upload")

router.get("/", authProtect, myPage);
router.post("/create", authProtect, createMyPage);
// router.get("/me", authProtect, me);

module.exports = router;
