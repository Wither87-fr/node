let db = require('../configDb');


module.exports.test = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT COUNT(*) AS NB FROM vip ;";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getFirstLetters = function (callback) {
    db.getConnection(function (err,connexion) {
        if(!err) {
            let sql = "SELECT DISTINCT SUBSTRING(VIP_NOM,1,1) AS firstLett FROM vip ORDER BY SUBSTRING(VIP_NOM,1,1) ASC;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.findVipByLetter = function (callback, letter) {
    db.getConnection( function (err, connexion) {
        if(!err) {
            let sql = `SELECT DISTINCT v.VIP_NUMERO AS VIP_NUM, VIP_PRENOM, VIP_NOM, SUBSTRING(VIP_NOM,1,1) AS firstLett, PHOTO_ADRESSE FROM vip v, photo p WHERE VIP_NOM LIKE "${letter}%" AND v.VIP_NUMERO = p.VIP_NUMERO AND p.
            PHOTO_NUMERO = 1`;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getVipInfo = function(callback, vipNum) {
    db.getConnection( function (err, connexion) {
        if(!err) {
            let sql = `SELECT VIP_NOM, VIP_PRENOM, na.NATIONALITE_NOM AS Nationalite, VIP_TEXTE, DATE_FORMAT(VIP_NAISSANCE,"%a %e %M %Y") AS date_naissance FROM vip v JOIN 
                nationalite na ON v.NATIONALITE_NUMERO = na.NATIONALITE_NUMERO WHERE VIP_NUMERO = ${vipNum}`; //TODO add job
            connexion.query(sql, callback);
            connexion.release;
        }
    });
}