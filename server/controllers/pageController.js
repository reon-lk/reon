const User = require("../models/userModel");
const Page = require("../models/pageModel");

const mainID = "7777";

// @desc    Get mypage
// @route   GET /api/mypage
// @access  Private
const myPage = async (req, res) => {
  if (!req.user) {
    res.send("No Token!");
  } else {
    const page = await Page.findOne({ uId: req.user.uId });
    if (!page) {
      res.send("You don't have REON page");
    } else {
      // req.page(page)
      res.send(page);
    }
  }
};

// @desc    create mypage
// @route   POST /api/mypage/create
// @access  Private
const createMyPage = async (req, res) => {
  if (!req.user) {
    res.send("No Token!");
  } else {
    const { pageName, pageDescription, phone, pageDistrict, pageAddress } =
      req.body;

    if (
      !pageName ||
      !phone ||
      !pageDescription ||
      !pageDistrict ||
      !pageAddress
    ) {
      res.send("Please add all fields");
    } else {
      // Check if page exists
      const pageExists = await Page.findOne({ phone });

      if (pageExists) {
        res.send("Phone no already exists");
      } else {
        const utcTimestamp = new Date().getTime();

        // Create page
        const page = await Page.create({
          pId: mainID + utcTimestamp,
          uId: req.user.uId,
          pageName,
          pageDescription,
          phone,
          link: mainID + utcTimestamp,
          pageDistrict,
          pageAddress,
          profile: {
            public_id: "page/c275neccois5mawcv4xu", //vehicleRegistration.public_id,
            secure_url:
              "https://res.cloudinary.com/reon/image/upload/v1662458211/page/c275neccois5mawcv4xu.jpg", // vehicleRegistration.secure_url,
          },
          banner: {
            public_id: "page/c275neccois5mawcv4xu", //vehicleRegistration.public_id,
            secure_url:
              "https://res.cloudinary.com/reon/image/upload/v1662458211/page/c275neccois5mawcv4xu.jpg", // vehicleRegistration.secure_url,
          },
          status: "0", // wait=0, active=1, block=2, active&pending=3, deleted=4
          statusComment: "User create",
          tempPageName: pageName,
          tempPageDescription: pageDescription,
          tempPhone: phone,
          tempLink: mainID + utcTimestamp,
        });

        if (page) {
          User.findOneAndUpdate(
            { uId: req.user.uId },
            { $set: { isPage: "1" } },
            { new: true },
            (err, doc) => {
              res.send("Page Created Successfull!");
            }
          );
        } else {
          res.send("Something went wrong");
        }
      }
    }
  }
};

// @desc    Update mypage details
// @route   PUT /api/mypage/update
// @access  Private
const updateMyPage = async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const { tempPageName, tempPageDescription, tempPhone, tempLink } =
        req.body;

      if (tempPageName || tempPageDescription || tempPhone || tempLink) {
        const checkPage1 = await Page.findOne({ phone: tempPhone });
        const checkPage2 = await Page.findOne({ tempPhone: tempPhone });
        const checkPage3 = await Page.findOne({ link: tempLink });
        const checkPage4 = await Page.findOne({ tempLink: tempLink });
        if (checkPage1) {
          res.status(201).json("Phone exists");
        } else {
          if (checkPage2) {
            res.status(201).json("Phone exists");
          } else {
            if (checkPage3) {
              res.status(201).json("This link already taken");
            } else {
              if (checkPage4) {
                res.status(201).json("This link already taken");
              } else {
                const updateData = {
                  tempPageName: tempPageName,
                  tempPageDescription: tempPageDescription,
                  tempPhone: tempPhone,
                  tempLink: tempLink,
                  status: "3", // wait=0, active=1, block=2, active&pending=3, deleted=4
                  statusComment: "User update page details",
                };
                const updatedMyPage = await Page.findOneAndUpdate(
                  { pId: req.page.pId },
                  updateData
                );
                if (updatedMyPage) {
                  res
                    .status(201)
                    .json(await Page.findOne({ pId: req.page.pId }));
                } else {
                  res.status(201).json("Something went wrong in update!");
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
};

// @desc    Delete mypage
// @route   PUT /api/mypage/delete
// @access  Private
const deleteMyPage = async (req, res) => {
  try {
    if (!req.user) {
      res.status(201).json("Please signin");
    } else {
      const deleteData = {
        status: "4", // wait=0, active=1, block=2, active&pending=3, deleted=4
        statusComment: "User delete page",
      };
      const deletedMyPage = await Page.findOneAndUpdate(
        { pId: req.page.pId },
        deleteData
      );
      if (deletedMyPage) {
        res.status(201).json(await Page.findOne({ pId: req.page.pId }));
      } else {
        res.status(201).json("Something went wrong");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Something went wrong!");
  }
};

module.exports = {
  myPage,
  createMyPage,
  updateMyPage,
  deleteMyPage,
};
