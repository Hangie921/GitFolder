var login = require('../module/login'),
	multer = require('multer'),
	update = multer().single;


function route(app, mongoClient){
	app.post('/login',function(req,res){  
		login.check(req.body); 
		//call the login module
		res.render('index');
	});
}
 
exports.route = route;