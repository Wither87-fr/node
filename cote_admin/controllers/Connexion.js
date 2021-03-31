let model = require("../models/connexion.js");
let Cryptr = require("cryptr");
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

module.exports.connexion = function(request, response){
  response.title = "Connexion";
  model.login(function(err, result){  // appel le module test qui exécute la requete SQL
    if (err) {
      console.log(err);
      return;
    }

    let id = request.body.login;
    let mdp = request.body.pwd
    let login = result[0]['LOGIN'];
    let passwd = result[0]['PASSWD'];

    const decryptedString = cryptr.decrypt(passwd);
    //console.log(decryptedString);
    if (id === login) {
      if (mdp === decryptedString) {
        request.session.login = login;
        response.render('home', response);
      }
      else {
        response.render('connexion', response);
      }
    }
    else {
      response.render('connexion', response);
    }
  });
};
