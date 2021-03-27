let model = require("../models/album.js");
let async = require('async');
// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';
   let vipNum = request.params.vipNum;

   async.parallel( [
           function (callback) {
               model.listerAlbum(function (err, result) {
                   callback(null,result);
               });
           },
           function (callback) {
               model.commentPhoto(vipNum, function (err, result) {
                   callback(null,result);
               }, vipNum);
           },
       ],
       function (err, result) {
           if (err) {
               console.log(err);
               return;
           }
           response.listerAlbum = result[0];
           console.log(result[0]);
           response.commentPhoto = result[1];
   response.render('listerAlbum', response);
 })
 }
