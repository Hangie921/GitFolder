var login = require('../module/login'),
	multer = require('multer'),
	update = multer().single(),
	bodyParser = require('body-parser'),
	mongo_handler = require('../../SDK/mongo_handler');


function route(app, mongoClient){
	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

	app.post('/login',function(req,res){
		// app.use(express.bodyParser());
		//session
		var sess = req.session
		var condition= {
				projection: {"_id":0,"psw":1,"acc":1,},
				sort: {},
				skip: 0,
				limit: 0
			};
		//query
		var query = {
			acc:req.body.acc
		};

		mongo_handler.handle(mongoClient,'find',null,'member',query,condition,function(err,status,result){
			var login_check = false;

			if (status){
				login_check = login.check(req.body,result)
				sess.login_status = login_check;
				sess.user = req.body.acc;
				sess.save();
			}
			else{
				
			}
			res.send({status:login_check});
			// if(login.check(req.body,result)==false){
			// 	// var session_status = false;
			// 	// res.render('index',{session_status:session_status});
			// 	res.send({status:false});
			// 	// res.send('error,please enter the correct account and passwords.');
			// }else{
			// 	console.log('psw checked');
			// 	res.send({status:true});
			// }

		});
	});
}
 
exports.route = route;