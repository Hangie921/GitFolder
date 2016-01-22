
function route(app, mongo){	
	app.get('/coming_soon.html',function(req,res){
		res.render('coming_soon');
	});
}

exports.coming_route = route;