const express = require("express");

const router = express.Router();

const {
  _register,
  _login,
  _getUser,
  _putHistoryofSymptoms,
  _getUserHistory,
} = require("../controllers/users.js");
const { verifyToken } = require("../middlequeries/VerifyToken.js");

router.post("/register",  _register);
router.post("/login", _login);
router.get("/user/:id", _getUser);
router.post("/user/:id/history", _putHistoryofSymptoms);
router.get("/user/:id/history", _getUserHistory);

router.get("/verify", verifyToken, (req, res) => {
  res.sendStatus(200);
});

module.exports = {
  router,
};
