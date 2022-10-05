const mongoose = require("mongoose");
// schema for vehicle
const vehicleSchema = mongoose.Schema(
  {
    vId: {
      type: String,
      required: true,
      unique: true,
    },
    pId: {
      type: String,
      required: true,
    },
    vehicleImages: {
      public_id: {
        type: 'string',
        required: true
      },
      secure_url: {
        type: 'string',
        required: true
      }
    },
    category: {
      type: String,
      required: [true, "Please add vehicle category"],
    },
    vehicleType: {
      type: String,
      required: [true, "Please add vehicle type"],
    },
    vehicleNo: {
      type: String,
      required: [true, "Please add vehicle no"],
      unique: true,
    },
    vehicleName: {
      type: String,
      required: [true, "Please add vehicle name"],
    },
    vehicleDescription: {
      type: String,
      required: [true, "Please add vehicle description"],
    },
    vehicleFuelType: {
      type: String,
      required: [true, "Please add vehicle fuel type"],
    },
    seats: {
      type: String,
      required: [true, "Please add vehicle seats count"],
    },
    location: {
      type: String,
      required: [true, "Please add vehicle location"],
    },
    vehicleACType: {
      type: String,
      required: [true, "Please add vehicle AC Type"],
    },
    vehicleRegistration: {
      public_id: {
        type: 'string',
        required: true
      },
      secure_url: {
        type: 'string',
        required: true
      }
    },
    vehicleInsurance: {
      public_id: {
        type: 'string',
        required: true
      },
      secure_url: {
        type: 'string',
        required: true
      }
    },
    vehicleTax: {
      public_id: {
        type: 'string',
        required: true
      },
      secure_url: {
        type: 'string',
        required: true
      }
    },
    vehicleThirdPartyInsurance: {
      public_id: {
        type: 'string',
        required: true
      },
      secure_url: {
        type: 'string',
        required: true
      }
    },
    status: {
      type: String,
      required: true,
    },
    statusComment: {
      type: String,
      required: true,
    },
    tempVehicleName: {
      type: String,
      required: true,
    },
    tempVehicleDescription: {
      type: String,
    },
    tempSeats: {
      type: String,
      required: true,
    },
    tempLocation: {
      type: String,
      required: true,
    },
    tempVehicleACType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("vehicle", vehicleSchema);