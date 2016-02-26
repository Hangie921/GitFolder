function route(app, mongoClient){
	app.get('/',function(req,res){  
		res.render('login');
	});
}
 
exports.route = route;