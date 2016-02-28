var login = require('../module/login'),
	bodyParser = require('body-parser'),
	mongo_handler = require('../../SDK/mongo_handler');

function route(app, mongoClient){
	app.get('/contact_info',function(req,res){
		var query = {};
		condition = {
			projection:{"_id":0},
			sort:{},
			skip:0,
			limit:0
		};
		mongo_handler.handle(mongoClient,'find',null,'contact',query,condition,function(err,status,result){
			if(err){
				console.log('error while loading the docs from contact collection');
				console.log(err);
			}else if(status === false){
				console.log('mongo return nothing');
				res.send('mongo find nothing');
			}else{
				console.log('result: '+ result);
				console.log("send the doc to jade");
				// console.log(JSON.parse(JSON.stringify(result)));
				// res.render('index',{results:JSON.parse(JSON.stringify(result))});
				res.render('contact_info',{results:JSON.parse(JSON.stringify(result))});
				// res.render('index',{results:result});
				res.end();
			}

		});
	});
}
 
exports.route = route;