function route(app, mongoClient){
	app.get('/',function(req,res){  
		res.render('login');
		console.log("'/' routed");
	});
}
 
exports.route = route;