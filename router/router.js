let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let ArticleController = require("../controllers/ArticleController");



// Routes
module.exports = function(app){

// Main Routes
    app.get('/', HomeController.Index);
    app.get('/accueil', HomeController.Index);

// VIP
    app.get('/repertoire', VipController.Repertoire);
    app.get('/repertoire/:letter', VipController.Search);
    app.get('/repertoire/:letter/:num', VipController.Show);
// albums
    app.get('/album', AlbumController.ListerAlbum);
//article
    app.get('/articles', ArticleController.articlesAll);
    app.get('/articles/:num', ArticleController.articlesVip);

// tout le reste
    app.get('*', HomeController.NotFound);
    app.post('*', HomeController.NotFound);

};
