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
				mongo_handler.handle(mongoClient,'find',null,'member',req.body,null,function(err,status,result){
					console.log(result.acc+" 11111");
					console.log(status);
					if(login.check(req.body,result)){
						res.render('index');			
					}else{
						res.send('error');
					}
				});
			}
		});
	});
}
 
exports.route = route;