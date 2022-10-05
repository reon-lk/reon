const express = require("express");
const router = express.Router();

const {
  addVehicle,
  getRequests,
  acceptRequests,
  myVehicles,
} = require("../controllers/ownerController");
const { myPage, createMyPage } = require("../controllers/pageController");

const { authProtect } = require("../middleware/authProtect");
// const upload = require("../middleware/upload")

// router.get("/", authProtect, myPage);
router.post("/vehicles/add", authProtect, addVehicle);
router.get("/request", authProtect, getRequests);
router.patch("/request/accept/:hId", acceptRequests);
router.get("/vehicles", authProtect, myVehicles);
// router.get("/me", authProtect, me);

module.exports = router;
