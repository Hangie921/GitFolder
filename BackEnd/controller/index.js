

function route(app, mongoClient){
	
	app.get('/',function(req,res){
		//session
		var sess = req.session

		console.log(sess);
		console.log(req.session.id);
		console.log(sess.login_status);

		if (sess.login_status === undefined){
			sess.login_status = false;
			sess.save();
		}

		res.render('index',{session_status:sess.login_status});
	});
}
 
exports.route = route;