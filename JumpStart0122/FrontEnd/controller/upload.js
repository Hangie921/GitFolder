var multer= require('multer'),
	assert = require('assert'),
	mongo_handler = require('../../SDK/mongo_handler'),
	mongo_connect = require('../../SDK/mongo_connect.js'),
	storage1 = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, './upload')
	  },
	  filename: function (req, file, cb) {
	    cb(null, 'walter.jpg')
	  }
	});
//setting above

var upload = multer({ storage: storage1 }); // declare a multer object

function route(app,db){
	var cpFile = upload.single('BP_file');
	app.post('/upload', cpFile, function (req, res, next) {

			console.log('Uploading the file and the info');
			mongo_handler.handle(app,db,'insert',req,res);
		  // req.file is the `upload` file
		  // req.body will hold the text fields, if there were any
		  res.redirect('show');
		});

}

exports.route = route;