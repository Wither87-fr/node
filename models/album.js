let db = require('../configDb');


module.exports.listerAlbum = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT 'X' AS num, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.commentPhoto = function(vipNum, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   `SELECT  v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE, PHOTO_COMMENTAIRE FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE v.VIP_NUMERO = ${vipNum}`;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
