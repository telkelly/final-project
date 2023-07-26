const {
  register,
  login,
  getUser,
  putHistoryofSymptoms,
  getUserHistory,
} = require("../modules/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const _register = async (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password + "", salt);

  let lower_email = email.toLowerCase();
  register(firstname, lastname, lower_email, hash)
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "user already exist" });
    });
};

const _login = async (req, res) => {
  login(req.body.email.toLowerCase())
    .then(async (row) => {
      console.log("row", row, "req", req.body);
      if (row.length === 0)
        return res.status(404).json({ msg: "email not found" });

      const match = await bcrypt.compare(req.body.password, row[0].password);
      if (!match) return res.status(400).json({ msg: "wrong password" });
      console.log("user info", row);

      const userid = row[0].id;
      const email = row[0].email;

      const accessToken = jwt.sign(
        { userid, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "10000s",
        }
      );

      res.cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 1000,
      });

      res.json({ auth: true, token: accessToken, result: row});
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: err.message });
    });
};

const _getUser = (req,res) => {
  getUser(req.params.id)
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err);
    res.status(404).json({msg:'not found'})
  })
}

const _putHistoryofSymptoms = (req, res) => {
  const { id, historyofsymptoms } = req.body;
  putHistoryofSymptoms(id, historyofsymptoms)
    .then((result) => {
      console.log(res.json(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "nothing to put" });
    });
}

const _getUserHistory = (req, res) => {
  getUserHistory(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "history not found" });
    });
}

module.exports = {
  _register,
  _login,
  _getUser,
  _putHistoryofSymptoms,
  _getUserHistory,
};

