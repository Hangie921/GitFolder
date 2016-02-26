function route(app, mongoClient){
	app.get('/index_sg',function(req,res){  
		res.render('index_sg');
	});
}
 
exports.route = route;