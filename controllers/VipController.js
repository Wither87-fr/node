let async = require('async')
let model = require("../models/vip.js");

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){
    response.title = 'Répertoire des stars';
    model.getFirstLetters(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.firstVipLet = result;
        response.render('repertoireVips', response);
    });
}

module.exports.Search = function (request, response) {
    response.title = 'Répertoire des stars';
    let letter = request.params.letter;
    async.parallel( [
            function (callback) {
                model.getFirstLetters(function (err, result) {
                    callback(null, result);
                });
            } ,
            function (callback) {
                model.findVipByLetter(function (errE, resE) {
                    callback(null,resE);
                }, letter);
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.firstVipLet = result[0];
            response.vips = result[1];
            response.render('repertoireVips', response);
        })
}
module.exports.Show = function (request, response) {
    response.title = 'Répertoire des stars';
    let name = request.params.name;
    async.parallel( [
            function (callback) {
                model.getFirstLetters(function (err, result) {
                    callback(null, result);
                });
            } ,
            function (callback) {
                model.getVipInfo(function (errE, resE) {
                    callback(null,resE);
                }, name);
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.firstVipLet = result[0];
            response.vipInfos = result[1];
            response.render('repertoireVips', response);
        })
}