const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.token || req.headers["x-access-token"];

  if (!accessToken) return res.status(401).json({ msg: "unathorized" });

  jwt.verify(accessToken, process.env.secretCode, (err, decoded) => {
      if (err) return res.status(403).json({ msg: "unathorized token failed" });
      next()
  });
    
};

module.exports = {
    verifyToken
}
