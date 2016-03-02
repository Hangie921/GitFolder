

function route(app, mongoClient){
	
	app.get('/',function(req,res){  
		// res.render('login');
		var sess = req.session
		console.log(sess);
		console.log(req.sessionID);
		console.log(req.session.id);
		console.log(sess.login_status);
		if (sess.login_status === undefined){
			// set a session
			sess.login_status = false;
			// set the session expire after an hour.
			// req.session.cookie.maxAge = 5000; 
			sess.save();
		}

		res.render('index',{session_status:sess.login_status});
		// res.render('index',{results:result});
		res.end();
	});
}
 
exports.route = route;