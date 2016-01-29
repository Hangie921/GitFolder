var login = require('../module/login');

function route(app, mongoClient){
	app.post('/login',function(req,res){  
		login.check()
		//call the login module
		res.render('index');
	});
}
 
exports.route = route;