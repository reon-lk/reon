const express = require("express");
const router = express.Router();

const { register, login, me, getVehicles, getVehicle, hireVehicle, hireHistory, payment } = require("../controllers/userController");

const {authProtect} = require("../middleware/authProtect");
// const upload = require("../middleware/upload")

router.post("/register", register);
router.post("/login", login);
router.get("/me", authProtect, me);
router.get("/vehicles", getVehicles);
router.get("/vehicle/:vId", getVehicle);
router.post("/vehicle/request/:vId", authProtect, hireVehicle);
router.get("/hireHistory", authProtect, hireHistory);
router.patch("/payment/:hId",authProtect, payment);

module.exports = router;
