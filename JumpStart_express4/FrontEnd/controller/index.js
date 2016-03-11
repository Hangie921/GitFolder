function route(app, mongoClient){
	app.get('/',function(req,res){  
		res.render('index');
	});
}
 
exports.index_route = route;