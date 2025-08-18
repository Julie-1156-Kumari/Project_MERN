const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    // console.log("Request body userId: ", req.userId);
    next();
  } catch (err) {
    res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};