var mongo_handler = require('../../SDK/mongo_handler');

function route(app, mongoClient){
	app.get('/show',function(req,res){  

		res.render('show');
	});
}
exports.show_route = route;