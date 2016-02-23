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
				mongo_handler.handle(mongoClient,'find',null,'member',req.body,condition,function(err,status,cursor){
					if(login.check(req.body,cursor)==false){
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
						mongo_handler.handle(mongoClient,'find',null,'detail',query,condition,function(err,status,cursor){
							if(err){
								console.log('error while loading the docs from detail collection');
								console.log(err);
							}else if(cursor === null){
								console.log('mongo return nothing');
								res.send('mongo find nothing');
							}else{
								var docArray = cursor.toArray();
								console.log(docArray[1]);
								console.log("send the doc to jade");
								res.render('index',{results:docArray});
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