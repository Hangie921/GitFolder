function route(app, mongo){
	app.get('/',function(req,res){  
		res.render('index');
	});
}
 
exports.index_route = route;