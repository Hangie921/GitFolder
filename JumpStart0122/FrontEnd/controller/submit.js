//upload the file , call the submit module , send the status to user

function route(app, mongo){	
	app.get('/submit.html',function(req,res){
		res.render('submit');
	});
}

exports.submit_route = route;