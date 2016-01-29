var logout = require('../module/logout');

function route(app, mongoClient){
	app.get('/logout',function(req,res){  
		logout.empty_session();
		res.render('login');
	});
}
 
exports.route = route;