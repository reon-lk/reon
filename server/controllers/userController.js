const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

// const cloudinary = require("../middleware/cloudinary");

const PUBLISHABLE_KEY =
  "pk_test_51LiOnBLKQPxWZz8bflnmOkZvmVJu3TnMd4raMUaXTZEpxUxsKeEC9qGFExKdGnixQbbFeMoAiY4mCSB7m6D7UVL8007SNQNP5y";
const SECRET_KEY =
  "sk_test_51LiOnBLKQPxWZz8bvwq4siryiZAUJhqhz6hBPj9SiubE9oCZzxdqlVCf17COsCUSolTbbtkgGl6bZR8DgbIPsDMR00TgeQD6sM";

const stripe = require("stripe")(SECRET_KEY);

const User = require("../models/userModel");
const Vehicle = require("../models/vehicleModel");
const Tour = require("../models/tourHireModel");

const mainId = "7777";

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.send("Please add all fields");
  } else {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.send("User already exists");
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const utcTimestamp = new Date().getTime();

      // const result = await cloudinary.uploader.upload(
      //   req.file.path,
      //   { folder: "user" },
      //   (use_filename) => true,
      //   (unique_filename) => false
      // );

      // Create user
      const user = await User.create({
        uId: mainId + utcTimestamp,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profile: {
          public_id: "",
          secure_url:
            "https://res.cloudinary.com/reon/image/upload/v1663046030/source/reon-profile_ogihv8.png",
        },
        role: "0",
        status: "1",
        isPage: "0",
      });

      if (user) {
        res.send("Register successfull");
      } else {
        res.send("Something went wrong");
      }
    }
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.uId);
    res.send(token);
  } else {
    res.send("Email or Password is incorrect");
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/me
// @access  Private
const me = async (req, res) => {
  res.send(req.user);
};

// @desc    Get all vehicles
// @route   POST /api/users/vehicles
// @access  Public
const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({ status: "1" });
  res.send(vehicles);
};

// @desc    Get a vehicle
// @route   POST /api/users/vehicle/:vId
// @access  Public
const getVehicle = async (req, res) => {
  const vehicle = await Vehicle.findOne({ vId: req.params.vId });
  // if (!vehicle.status == "1") {
  //   res.send("No Vehicle Found");
  // } else {
  res.send(vehicle);
  // }
};

// @desc    Post user data
// @route   POST /api/users/vehicle/request/:vId
// @access  Private
const hireVehicle = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, pickupDropoffTime, passengers } =
      req.body;
    const utcTimestamp = new Date().getTime();
    const page = await Vehicle.findOne({ vId: req.params.vId });

    const tourHire = await Tour.create({
      hId: mainId + utcTimestamp,
      vId: req.params.vId,
      pId: page.pId,
      uId: req.user.uId,
      pickupLocation: pickupLocation,
      dropoffLocation: dropoffLocation,
      pickupDropoffTime: {
        to: pickupDropoffTime.to,
        from: pickupDropoffTime.from,
      },
      passengers: passengers,
      isAccept: "0",
      acceptAmount: 0,
      acceptTime: "0",
      isConfirm: "0",
      confirmTime: "0",
      transactionId: "0",
      isFinished: "0",
      finishedTime: "0",
    });

    if (tourHire) {
      res.send("Request sent successfull");
    } else {
      res.send("Something went wrong");
    }
  } catch (error) {
    res.send(error);
  }
};

const hireHistory = async (req, res) => {
  const Hire = await Tour.find({ uId: req.user.uId }).sort({
    updatedAt: -1,
  });
  res.send(Hire);
};

const payment = async (req, res) => {
  const { token } = req.body;

  try {
    const utcTimestamp = new Date().getTime();

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.amount * 100,
        currency: "lkr",
        customer: customer.id,
        receipt_email: req.body.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      // req.body.transactionId = payment.source.id

      const pay = await Tour.findOneAndUpdate(
        { hId: req.params.hId },
        {
          isConfirm: "1",
          confirmTime: utcTimestamp,
          transactionId: payment.source.id,
        },
        { new: true }
      );

      res.send("Your booking is successfull");
    } else {
      res.json(error);
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const payment1 = async (req, res) => {
  // Moreover you can take more details from user
  // like Address, Name, etc from form
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Dilshan",
      address: {
        line1: "Rasavin Thoddam",
        postal_code: "14123",
        city: "Jaffna",
        state: "Northern",
        country: "Srilanka",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 700000, // Charing Rs 25
        description: "Testing",
        currency: "LKR",
        customer: customer.id,
      });
    })
    .then((charge) => {
      res.send("Success"); // If no error occurs
    })
    .catch((err) => {
      res.send(err); // If some error occurs
    });
};

// Generate JWT
const generateToken = (uId) => {
  return jwt.sign({ uId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  register,
  login,
  me,

  getVehicles,
  getVehicle,
  hireVehicle,
  hireHistory,
  payment,
};
