const adminCtrl = {};
const pool = require('../config/dbConection');
const helpers = require("../lib/helpers");

adminCtrl.addCity = async (req, res) => {
  try {
    const rows = await pool.query("INSERT INTO cities (name) VALUES (?)", [
      req.body.name
    ]);
    res.json({ 'response': rows, 'result': 'ok' });
  } catch (error) {
    if (error.errno === 1062) {
      return res.json({ 'response': "Ya existe una ciudad registrada con este nombre: " + req.body.name, 'result': 'warning' });
    }
    res.json({ 'response': error, 'result': 'ko' });
  }
};

adminCtrl.addBrandOffices = async (req, res) => {
  try {
    const rows = await pool.query("INSERT INTO branch_offices (name, id_city) VALUES (?,?)", [
      req.body.name,
      req.body.id_city
    ]);
    res.json({ 'response': rows, 'result': 'ok' });
  } catch (error) {
    if (error.errno === 1062) {
      return res.json({ 'response': "Ya existe una sucursal registrada con este nombre: " + req.body.name, 'result': 'warning' });
    }
    res.json({ 'response': error, 'result': 'ko' });
  }
};

adminCtrl.getUserList = async (req, res) => {
  try {
    let cities = req.body.id_city.replace(' ', '');
    let newCities = parseInt((cities.replace(',', '')),10);console.log(newCities);
    if (isNaN(newCities)) {
      return res.json({ 'response': 'Formato de envio incorrecto para id_city: ' + req.body.id_city, 'result': 'ko' });
    }

    const rows = await pool.query(`SELECT * FROM users u INNER JOIN branch_offices b ON b.id_branch_office = u.id_branch_office 
    INNER JOIN cities c ON c.id_city = b.id_city WHERE c.id_city IN (?) ORDER BY u.surnames`, [
      cities
    ]);
    if (rows.length == 0) {
      return res.json({ 'response': 'No existen usuarios para esta(s) ciudad(es)', 'result': 'ok' });
    }
    res.json({ 'response': rows, 'result': 'ok' });
  } catch (error) {
    res.json({ 'response': error, 'result': 'ko' });
  }
};

module.exports = adminCtrl;