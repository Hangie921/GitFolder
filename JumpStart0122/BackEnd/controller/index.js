function route(app, mongoClient){
	app.get('/',function(req,res){  
		// res.render('login');
		var session_status = false;
		res.render('index',{session_status:session_status});
		// res.render('index',{results:result});
		res.end();
	});
}
 
exports.route = route;