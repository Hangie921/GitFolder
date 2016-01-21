var express = require('express'),
	multer = require('multer'),
	app = express(),
	engines = require('consolidate');

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './')
  },
  filename: function (req, file, cb) {
    cb(null, 'walter.jpg')
  }
})

var upload = multer({ storage: storage1 });

	app.engine('html', engines.nunjucks );
	app.set('view engine','html');
	app.set('views', __dirname + '/views');
	
	app.post('/upload', upload.single('upload'), function (req, res, next) {
		
			res.render('show');
			console.log('file uploaded');
		  // req.file is the `upload` file
		  // req.body will hold the text fields, if there were any
		});

	//route the different page
	app.get('/',function(req,res){  
		res.render('index');
	});

	app.get('/submit.html',function(req,res){
		res.render('submit');
	});

	app.get('/coming_soon.html',function(req,res){
		res.render('coming_soon');
	});

	



	//route the pages that don't exist to 404
	app.use(function(req,res){
		res.sendStatus(404);
	});

	app.use( express.static( "public" ) );

	//start the server
	var server = app.listen(3000,function(){
	var port = server.address().port;
	console.log("Express server listening on port %s ",port);
});

// });
