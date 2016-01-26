function route(app, mongo){
	app.get('/show',function(req,res){  
		res.render('show');
	});
}
 
exports.show_route = route;