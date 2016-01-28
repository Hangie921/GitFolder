var instance = require('../SDK/instance'),
	mongo = instance.startMongo(),
	bodyParser = require('../FrontEnd/node_modules/body-parser'),
	config = require('../FrontEnd/config/server_init');


function handle(app,mongoClient,crud,req,res,doc,callback){
	var status = false;
	if(crud === "find"){
		findDetail(app,mongoClient,req,res);
	}else if(crud === "insert"){
		insertToDetail(app,mongoClient,req,res,doc,callback);
		// console.log("Insert success");
	}else if(crud === "update"){
		update(req,res);
		// console.log("update success");
	}else if(crud === "deleteInfo"){
		deleteInfo();
		// console.log("delete success");
	}
	
}

function findDetail(app,mongoClient,req,res){
	console.log("start to find");

}


function insertToDetail(app,mongoClient,req,res,doc,callback){
	console.log('start to insert');
	console.log(doc);
	mongoClient.connect(mongoClient.url,function(err,db){
		db.collection('detail').insertOne(doc,function(err,result){
			if(err){
				console.log(err);
			}else{
				console.log("Inserted docs into 'detail' collection");
			}
		db.close();
		});
		
	});
	// console.log(req.body.teamName);
	//req.body
	// db.collection('detail').insert(req.body);
	// return true;
	callback(req,res);
}

exports.handle = handle;