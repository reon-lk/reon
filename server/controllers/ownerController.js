const User = require("../models/userModel");
const Page = require("../models/pageModel");
const Vehicle = require("../models/vehicleModel");
const Tour = require("../models/tourHireModel");

const mainID = "7777";

// @desc    Owner add vehicle for page
// @route   GET /api/user/vehicle/add
// @access  Private
const addVehicle = async (req, res) => {
  if (!req.user) {
    res.send("No Token!");
  } else {
    const page = await Page.findOne({ uId: req.user.uId });
    if (!page) {
      res.send("You don't have REON page");
    } else {
      // req.page(page)
      // res.send(page);
      const utcTimestamp = new Date().getTime();
      const {
        category,
        vehicleType,
        vehicleNo,
        vehicleName,
        vehicleDescription,
        vehicleFuelType,
        seats,
        location,
        vehicleACType,
      } = req.body;
      if (
        !vehicleType ||
        !vehicleNo ||
        !vehicleName ||
        !vehicleDescription ||
        !vehicleFuelType ||
        !vehicleACType ||
        !category ||
        !seats ||
        !location
      ) {
        res.send("Please add all fields");
      } else {
        const vehicleExists = await Vehicle.findOne({
          vehicleNo: vehicleNo,
        });
        if (vehicleExists) {
          return res.json("Vehicle already exists");
        } else {
          // const vehicleImages = await cloudinary.uploader.upload(
          //   req.files.vehicleImages[0].path,
          //   { folder: "vehicle" },
          //   (use_filename) => true,
          //   (unique_filename) => false
          // );
          // const vehicleRegistration = await cloudinary.uploader.upload(
          //   req.files.vehicleRegistration[0].path,
          //   { folder: "vehicle" },
          //   (use_filename) => true,
          //   (unique_filename) => false
          // );
          // const vehicleInsurance = await cloudinary.uploader.upload(
          //   req.files.vehicleInsurance[0].path,
          //   { folder: "vehicle" },
          //   (use_filename) => true,
          //   (unique_filename) => false
          // );
          // const vehicleTax = await cloudinary.uploader.upload(
          //   req.files.vehicleTax[0].path,
          //   { folder: "vehicle" },
          //   (use_filename) => true,
          //   (unique_filename) => false
          // );
          // const vehicleThirdPartyInsurance = await cloudinary.uploader.upload(
          //   req.files.vehicleThirdPartyInsurance[0].path,
          //   { folder: "vehicle" },
          //   (use_filename) => true,
          //   (unique_filename) => false
          // );
          const vehicle = await Vehicle.create({
            vId: mainID + utcTimestamp,
            pId: page.pId,
            vehicleImages: {
              public_id: "page/c275neccois5mawcv4xu", //vehicleImages.public_id,
              secure_url:
                "https://res.cloudinary.com/reon/image/upload/v1663323209/vehicle/img_20220914022636_659475_dsnqqp.jpg", //vehicleImages.secure_url,
            },
            category,
            vehicleType,
            vehicleNo,
            vehicleName,
            vehicleDescription,
            vehicleFuelType,
            seats,
            location,
            vehicleACType, // AC=1, NonAC=0
            vehicleRegistration: {
              public_id: "page/c275neccois5mawcv4xu", //vehicleRegistration.public_id,
              secure_url:
                "https://res.cloudinary.com/reon/image/upload/v1662458211/page/c275neccois5mawcv4xu.jpg", // vehicleRegistration.secure_url,
            },
            vehicleInsurance: {
              public_id: "page/c275neccois5mawcv4xu", //vehicleInsurance.public_id,
              secure_url:
                "https://res.cloudinary.com/reon/image/upload/v1662458211/page/c275neccois5mawcv4xu.jpg", //vehicleInsurance.secure_url,
            },
            vehicleTax: {
              public_id: "page/c275neccois5mawcv4xu", //vehicleTax.public_id,
              secure_url:
                "https://res.cloudinary.com/reon/image/upload/v1662458211/page/c275neccois5mawcv4xu.jpg", //vehicleTax.secure_url,
            },
            vehicleThirdPartyInsurance: {
              public_id: "page/c275neccois5mawcv4xu", //vehicleThirdPartyInsurance.public_id,
              secure_url:
                "https://res.cloudinary.com/reon/image/upload/v1662458211/page/c275neccois5mawcv4xu.jpg", //vehicleThirdPartyInsurance.secure_url,
            },
            status: "0", // wait=0, active=1, block=2, active&pending=3 deleted=4
            statusComment: "vehicle added",
            tempVehicleName: vehicleName,
            tempVehicleDescription: vehicleDescription,
            tempSeats: seats,
            tempLocation: location,
            tempVehicleACType: vehicleACType,
          });
          res.json(vehicle);
        }
      }
    }
  }
};

// @desc    Get all request
// @route   POST /api/users/request
// @access  Public
const getRequests = async (req, res) => {
  const page = await Page.findOne({ uId: req.user.uId });
  if (!page) {
    res.send("You don't have REON page");
  } else {
    const requests = await Tour.find({ pId: page.pId }).sort({
      updatedAt: -1,
    });
    res.send(requests);
  }
};

// @desc    Accept request
// @route   Patch /api/users/request
// @access  Public
const acceptRequests = async (req, res) => {
  const requests = await Tour.findOneAndUpdate(
    { hId: req.params.hId },
    { isAccept: "1", acceptAmount: req.body.acceptAmount },
    { new: true }
  );
  if (requests) {
    // console.log(requests);
    res.send("receive");
  } else {
    res.send("Something went wrong");
  }
};

const myVehicles = async (req, res) => {
  const page = await Page.findOne({ uId: req.user.uId });
  const vehicle = await Vehicle.find({ pId: page.pId });
  res.send(vehicle);
};

module.exports = {
  addVehicle,
  getRequests,
  acceptRequests,
  myVehicles,
};
