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
            let sql = `SELECT VIP_NOM, VIP_PRENOM, na.NATIONALITE_NOM AS Nationalite, VIP_TEXTE, VIP_NAISSANCE AS date_naissance, p.PHOTO_ADRESSE FROM vip v JOIN 
                nationalite na ON v.NATIONALITE_NUMERO = na.NATIONALITE_NUMERO JOIN photo p ON p.VIP_NUMERO = v.VIP_NUMERO WHERE v.VIP_NUMERO = ${vipNum} AND p.PHOTO_NUMERO = 1`; //TODO add job
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}

module.exports.getVipJob = function(callback, vipNum) {
    db.getConnection( function (err, connexion) {
       if(!err) {
           let sql = `SELECT VIP_NUMERO, pro_nom, pro_action, pro_principal FROM (
                        SELECT VIP_NUMERO, "Acteur" AS pro_nom, "film" AS pro_action, "film" AS pro_principal FROM acteur WHERE VIP_NUMERO = ${vipNum}
                        UNION
                        SELECT VIP_NUMERO, "Couturier" AS pro_nom, "réalisation" AS pro_action, "defile" AS pro_principal FROM couturier WHERE VIP_NUMERO = ${vipNum}
                        UNION
                        SELECT VIP_NUMERO, "Realisateur" AS pro_nom, "film" AS pro_action, "film" AS pro_principal FROM realisateur WHERE VIP_NUMERO = ${vipNum}
                        UNION
                        SELECT VIP_NUMERO, "Chanteur" AS pro_nom, "album" AS pro_action, "chanson" AS pro_principal FROM chanteur WHERE VIP_NUMERO = ${vipNum}
                        UNION
                        SELECT VIP_NUMERO, "Mannequin" AS pro_nom, "défilé" AS pro_action, "defile" AS pro_principal FROM mannequin WHERE VIP_NUMERO = ${vipNum}
                       )t`
           connexion.query(sql, callback)
           connexion.release()
       }
    });
}

module.exports.listFilm = function (vipNum, callback) {
    db.getConnection(function (err, connexion) {
        if(!err) {
            let sql = `SELECT FILM_TITRE, FILM_DATEREALISATION, f.VIP_NUMERO as real_num, f.FILM_NUMERO, t.real_pre, t.real_nom FROM film f JOIN joue j ON f.FILM_NUMERO = j.FILM_NUMERO JOIN vip v ON v.VIP_NUMERO = j.VIP_NUMERO JOIN (SELECT f.FILM_NUMERO,v.VIP_PRENOM AS real_pre, v.VIP_NOM AS real_nom FROM vip v JOIN film f ON f.VIP_NUMERO = v.VIP_NUMERO WHERE f.FILM_NUMERO IN (SELECT f.FILM_NUMERO FROM film f, joue j WHERE f.FILM_NUMERO = j.FILM_NUMERO AND j.VIP_NUMERO = ${vipNum}))t ON t.FILM_NUMERO = f.FILM_NUMERO WHERE v.VIP_NUMERO = ${vipNum}`
            connexion.query(sql, callback)
            connexion.release()
        }
    });
}

module.exports.listDefileDans = function (vipNum, callback) {
    db.getConnection(function (err, connexion) {
        if(!err) {
            let sql = `SELECT DEFILE_LIEU, DEFILE_DATE, d.VIP_NUMERO as cout_num, d.DEFILE_NUMERO, t.cout_pre, t.cout_nom FROM defile d JOIN defiledans dd ON d.DEFILE_NUMERO = dd.DEFILE_NUMERO JOIN vip v ON v.VIP_NUMERO = dd.VIP_NUMERO JOIN (SELECT d.DEFILE_NUMERO,v.VIP_PRENOM AS cout_pre, v.VIP_NOM AS cout_nom FROM vip v JOIN defile d ON d.VIP_NUMERO = v.VIP_NUMERO WHERE d.DEFILE_NUMERO IN (SELECT d.DEFILE_NUMERO FROM defile d, defiledans dd WHERE d.DEFILE_NUMERO = dd.DEFILE_NUMERO AND dd.VIP_NUMERO = ${vipNum}))t ON t.DEFILE_NUMERO = d.DEFILE_NUMERO WHERE v.VIP_NUMERO = ${vipNum}`
            connexion.query(sql, callback)
            connexion.release()
        }
    })
}