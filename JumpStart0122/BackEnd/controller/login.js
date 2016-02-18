var login = require('../module/login'),
	multer = require('multer'),
	update = multer().single(),
	mongo_handler = require('../../SDK/mongo_handler');


function route(app, mongoClient,callback){
	app.post('/login',function(req,res){ 
		update(req,res,function(err){
			if(err){
				console.log(err);
				return;
			}else{
				console.log(req.body);
				if(login.check(req.body)){
					res.render('index');			
				}else{
					res.send('error');
				}
			}
		});
		//call the login module
		
	});
}
 
exports.route = route;