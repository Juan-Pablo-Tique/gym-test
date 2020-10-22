const jwt = require('jsonwebtoken');
const { SEED } = require('../config/keys');

// =============================
// VERIFICAR EL TOKEN
// =============================
module.exports = {
  isLoggedIn (req, res, next) {
    var token = req.body.token;
    jwt.verify(token, SEED, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({
            ok: false,
            mensaje: "Token incorrecto",
            error: err
          });
      }
      req.usuario = decoded.usuario;
      next();
    });
  }
};
