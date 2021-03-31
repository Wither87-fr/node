let db = require('../../configDb');

module.exports.login = function(callback) {
  db.getConnection(function(err, connexion) {
      if (!err) {
          let sql = "SELECT * FROM PARAMETRES";
          // console.log(sql);
          connexion.query(sql, callback);
          connexion.release();
      }
  });
}
