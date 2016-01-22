
function route(app, mongo){	
	app.get('/coming',function(req,res){
		res.render('coming_soon');
	});
}

exports.coming_route = route;