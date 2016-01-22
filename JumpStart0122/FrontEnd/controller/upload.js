var multer= require('multer'),
	storage1 = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, './upload')
	  },
	  filename: function (req, file, cb) {
	    cb(null, 'walter.jpg')
	  }
	})

var upload = multer({ storage: storage1 });



function route(app,mongo){
	app.post('/upload', upload.single('upload'), function (req, res, next) {
			res.render('show');
			console.log('file uploaded');
		  // req.file is the `upload` file
		  // req.body will hold the text fields, if there were any
		});
}

exports.route = route;