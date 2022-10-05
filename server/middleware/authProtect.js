const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

const authProtect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ uId: decoded.uId });
    next();
  } else {
    res.send("Not Authorize!");
  }

  // const {token} = req.body;
  // // const tokenSplit1 = token.split(".")[0]
  // const tokenSplit2 = token.split(" ")[1]
  // // const tokenSplit = `${tokenSplit1}.${tokenSplit1}`
  // const decoded = jwt.verify(tokenSplit2, process.env.JWT_SECRET);
  // // console.log(tokenSplit2)
  // console.log(decoded)

  
};

module.exports = {
  authProtect,
};
