var login = require('../module/login'),
	bodyParser = require('body-parser'),
	mongo_handler = require('../../SDK/mongo_handler');
	log = require("../../SDK/log_handler");

function route(app, mongoClient){
	app.get('/reg_info',function(req,res){
		//session
		var sess = req.session
		if (sess.login_status === undefined || sess.login_status === null || sess.login_status === false){
			res.redirect('/');
			// res.render('index',{results:result});
			res.end();
		}
		//query
		var query = {};
		var condition = {
			projection:{"_id":0},
			sort:{},
			skip:0,
			limit:0
		};
		var result = {};

		mongo_handler.handle(mongoClient,'find',null,'detail',query,condition,function(err,status,mongo_result){
			if(err){
				console.log('error while loading the docs from detail collection');
				console.log(err);
				log.error("error while loading the docs from contact collection");
				log.error(err);
				// res.render('reg_info',{results:JSON.parse(JSON.stringify(result))});
				// res.end();

			}else if(status === false){
				console.log('mongo return nothing');
				log.info("mongo found nothing here");
				log.error(err);
				// res.render('reg_info',{results:JSON.parse(JSON.stringify(result))});
				// res.end();

			}else{
				console.log('result: '+ result);
				result = mongo_result;
				log.info( 'result: '+ JSON.parse(JSON.stringify(result)) );
				// res.render('reg_info',{results:JSON.parse(JSON.stringify(result))});
				// res.end();
				
			}
			res.render('reg_info',{
					results : JSON.parse(JSON.stringify(result)),
					user : sess.user
				}
			);
			res.end();

		});
	});
}
 
exports.route = route;