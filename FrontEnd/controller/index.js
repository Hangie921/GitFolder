function route(app, mongoClient){
	app.get('/',function(req,res){  
		res.render('index_sg');
	});
}
 
exports.index_route = route;