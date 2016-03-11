var logout = require('../module/logout');

function route(app, mongoClient){
	app.get('/logout',function(req,res){
		var sess = req.session  
		logout.empty_session(sess);
		res.redirect('/');
	});
}
 
exports.route = route;