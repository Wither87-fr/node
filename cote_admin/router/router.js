let HomeController = require('./../controllers/HomeController');
let ConnexionController = require('./../controllers/Connexion');




// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// Connexion
    app.get('/Connexion', ConnexionController.connexion);
  /*  app.get('/repertoire/:letter', VipController.Search);
    app.get('/repertoire/:letter/:num', VipController.Show);
// albums
    app.get('/album', AlbumController.ListerAlbum);
    app.get('/album/:numStar', AlbumController.MontrerAlbum);
//article
    app.get('/articles', ArticleController.articlesAll);
    app.get('/articles/:num', ArticleController.articlesVip);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);*/

};
