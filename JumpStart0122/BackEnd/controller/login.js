var login = require('../module/login'),
	multer = require('multer'),
	update = multer().single(),
	mongo_handler = require('../../SDK/mongo_handler');


function route(app, mongoClient){
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
					if(login.check(req.body,result)==false){
						res.send('error,please enter the correct account and passwords.');
					}else{
						console.log('psw checked');
						// res.render('index',{result:result});
						var query = {};
						condition = {
							projection:{"_id":0},
							sort:{},
							skip:0,
							limit:0
						};
						mongo_handler.handle(mongoClient,'find',null,'detail',query,condition,function(err,status,result){
							if(err){
								console.log('error while loading the docs from detail collection');
								console.log(err);
							}else if(status === false){
								console.log('mongo return nothing');
								res.send('mongo find nothing');
							}else{
								console.log('result: '+ result);
								console.log("send the doc to jade");
								// console.log(JSON.parse(JSON.stringify(result)));
								res.render('index',{results:JSON.parse(JSON.stringify(result))});
								// res.render('index',{results:result});
								res.end();
							}

						});
					}
				});
			}
		});
	});
}
 
exports.route = route;