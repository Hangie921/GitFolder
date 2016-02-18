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
				var query = {
					"acc":req.body.acc,
					"psw":req.body.psw
				};

				mongo_handler.handle(mongoClient,'find',null,'member',query,null,function(err,status,result){
					if(login.check(req.body,result)){
						//update the details
						console.log(result);
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