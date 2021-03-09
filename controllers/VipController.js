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
    let num = request.params.num;
    async.parallel( [
            function (callback) {
                model.getFirstLetters(function (err, result) {
                    console.log("res0")
                    callback(null, result);
                });
            } ,
            function (callback) {
                model.getVipInfo(function (errE, resE) {
                    console.log("res1")
                    callback(null,resE);
                }, num);
            },
            function(callback) {
                model.getVipJob(function (errA, resA) {
                    console.log("res2")
                    callback(null, resA)
                }, num);
            },
            function (callback) {
                model.listFilm(num, function (errB, resB) {
                    console.log("res3")
                    callback(null, resB)
                })
            },
            function (callback) {
                model.listDefileDans(num, function (errC, resC) {
                    console.log("Entré das res4")
                    callback(null, resC)
                })
            },
        ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.firstVipLet = result[0];
            response.vipInfos = result[1][0];
            response.professions = result[2];
            response.films = result[3];
            response.defile = response[4];
            console.log(response[4])
            response.render('repertoireVips', response);
        })
}