var instance = require('../SDK/instance'),
	mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init');


function handle(app,mongoClient,crud,req,res){
	var status = false;
	if(crud === "find"){

	}else if(crud === "insert"){
		insertToDetail(app,mongoClient,req,res);
		// console.log("Insert success");
	}else if(crud === "update"){
		update(req,res);
		// console.log("update success");
	}else if(crud === "deleteInfo"){
		deleteInfo();
		// console.log("delete success");
	}
	
}

function insertToDetail(app,mongoClient,req,res){
	console.log('start to insert');
	mongoClient.connect(mongoClient.url,function(err,db){
		db.collection('detail').insertOne(req.body,function(err,result){
			if(err){
				console.log(err);
			}else{
				console.log("Inserted docs into 'detail' collection");
			}

		});
	});
	// console.log(req.body.teamName);
	//req.body
	// db.collection('detail').insert(req.body);
	// return true;
}

exports.handle = handle;