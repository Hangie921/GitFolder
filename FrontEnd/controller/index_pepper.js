function route(app, mongoClient){
	app.get('/',function(req,res){  
		res.render('index_pepper');
	});
}
 
exports.index_route = route;