let db = require('../configDb');


module.exports.listerAlbum = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT CASE WHEN v.VIP_NUMERO <= 12 THEN '1'WHEN v.VIP_NUMERO > 12 AND v.VIP_NUMERO <= 24 THEN '2' WHEN v.VIP_NUMERO > 24 AND v.VIP_NUMERO <= 36 THEN '3' ELSE '4' END AS groupe, v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE PHOTO_NUMERO = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.commentPhoto = function(numStar, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   `SELECT v.VIP_NUMERO, VIP_NOM, VIP_PRENOM, PHOTO_ADRESSE, PHOTO_COMMENTAIRE FROM vip v JOIN photo p ON v.VIP_NUMERO = p.VIP_NUMERO WHERE v.VIP_NUMERO = ${numStar}`;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
