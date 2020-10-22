const authCtrl = {};
const pool = require('../config/dbConection');
const helpers = require("../lib/helpers");

const jwt = require('jsonwebtoken');
const { SEED, EXPIRESIN } = require('../config/keys');

authCtrl.authentication = async (req, res) => {
  const rows = await pool.query("SELECT * FROM administrators WHERE username = ?", [
    req.body.username
  ]); console.log(req.body);

  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(
      req.body.password,
      user.password
    );
    if (validPassword) {
      let token = jwt.sign({ username: req.body.username }, SEED, {
        expiresIn: EXPIRESIN
      });
      return res.json({ 'message': "Welcome " + user.username, "token": token, 'result': 'ok' });
    } else {
      return res.json({ 'message': "Incorrect Password", 'result': 'ko' });
    }
  } else {
    return res.json({ 'message': "The Username does not exists", 'result': 'ko' });
  }
};

authCtrl.signUp = async (req, res) => {
  let encryptPassword = await helpers.encryptPassword(req.body.password);
  try {
    const rows = await pool.query("INSERT INTO administrators (names, surnames, username, password) VALUES (?, ?, ?, ?)", [
      req.body.names, req.body.surnames, req.body.username, encryptPassword
    ]);
    res.json({ 'response': rows, 'result': 'ok' });
  } catch (error) {
    if (error.errno === 1062) {
      return res.json({ 'response': "Ya existe un administrador registrado con este nombre de usuario: " + req.body.username, 'result': 'warning' });
    }
    res.json({ 'response': error, 'result': 'ko' });
  }
};

module.exports = authCtrl;