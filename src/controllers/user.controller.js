const userCtrl = {};
const pool = require('../config/dbConection');

userCtrl.registerUser = async (req, res) => {
  try {
    let rows = await pool.query("INSERT INTO users (names, surnames, mobile, id_document_type, identification_number, birthday_date, id_branch_office) values (?, ?, ?, ?, ?, ?, ?)", [
      req.body.names, req.body.surnames, req.body.mobile, req.body.id_document_type, req.body.identification_number, req.body.birthday_date, req.body.id_branch_office
    ]);
    res.json({ 'response': rows, 'result': 'ok' });
  } catch (error) {
    if (error.errno === 1062) {
      return res.json({ 'response': "Ya existe un usuario registrado con este número de documento: " + req.body.identification_number, 'result': 'warning'  });
    }
    res.json({ 'response': error, 'result': 'ko'  });
  }
};

userCtrl.branchList = async (req, res) => {
  try {
    let rows = await pool.query("SELECT * FROM branch_offices WHERE id_status = 1 ORDER BY name");
    res.json({ 'response': rows, 'result': 'ok'  });
  } catch (error) {
    res.json({ 'response': error, 'result': 'ko'  });
  }
};

userCtrl.documentTypesList = async (req, res) => {
  try {
    let rows = await pool.query("SELECT * FROM types_documents WHERE id_status = 1 ORDER BY name");
    res.json({ 'response': rows, 'result': 'ok'  });
  } catch (error) {
    res.json({ 'response': error, 'result': 'ko'  });
  }
};

module.exports = userCtrl;