let db = require('../configDb');

module.exports.afficherArticle = function(vipNum,callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   `SELECT VIP_NOM, VIP_PRENOM, SUBSTRING(VIP_NOM,1,1) AS letter, v.VIP_NUMERO, ARTICLE_TITRE, ARTICLE_RESUME, ARTICLE_DATE_INSERT FROM vip v JOIN apoursujet a ON v.VIP_NUMERO=a.VIP_NUMERO  JOIN article ar ON a.ARTICLE_NUMERO=ar.ARTICLE_NUMERO WHERE v.VIP_NUMERO = ${vipNum};`;

            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.listeVipArticle = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql =   "SELECT VIP_NOM, VIP_PRENOM, VIP_NUMERO FROM vip WHERE VIP_NUMERO IN (SELECT VIP_NUMERO FROM apoursujet) ORDER BY VIP_NOM";
            // console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};