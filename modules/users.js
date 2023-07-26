const { db } = require("../config/dbsql");

const register = (firstname, lastname, email, password) => {
  return db("users")
    .insert({ firstname, lastname, email, password })
    .returning("id");
};

const login = (email) => {
  return db("users").select("id", "email", "password").where({ email });
};

const getUser = (id) => {
  return db('users')
  .select('id','firstname','lastname', 'email')
  .where({id})
}

const putHistoryofSymptoms = (id, historyofsymptoms) => {
  const jsonHistory = JSON.stringify(historyofsymptoms);
  return db("users").update({ historyofsymptoms:jsonHistory }).where("id", id);;
};

const getUserHistory = (id) => {
  return db("users").select("id", "historyofsymptoms").where({ id });
};


module.exports = {
  register,
  login,
  getUser,
  putHistoryofSymptoms,
  getUserHistory,
};
