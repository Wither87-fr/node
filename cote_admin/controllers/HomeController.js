

  // ////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    response.title = "Administration";
    response.render('home', response);
};

module.exports.NotFound = function(request, response){
    response.title = "Administration";
    response.render('notFound', response);
};
