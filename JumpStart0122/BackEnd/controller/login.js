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
				var condition= {
						projection: {"_id":0,"psw":1,"acc":1,},
						sort: {},
						skip: 0,
						limit: 0
					};
				mongo_handler.handle(mongoClient,'find',null,'member',req.body,condition,function(err,status,result){
					console.log(result.acc+" 11111");
					console.log(status);
					if(login.check(req.body,result)){
						res.render('index',{
							acc:result.acc,
							psw:result.psw
						});			
					}else{
						res.send('error');
					}
				});
			}
		});
	});
}
 
exports.route = route;