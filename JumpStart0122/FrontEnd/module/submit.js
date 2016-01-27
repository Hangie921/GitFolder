// write the details of the files into db
var config = require("../config/server_init.json");
var multer = require('multer'),
    storage1 = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, config.server.upload_path)
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now()+config.server.upload_file_format)
	  }
	});
//setting above

var timestamp = null;
var schema = {
	"team_info" : {
		"team_name" : "",  
		"product_brief" : "",
		"member_brief" : {  // add the member dynamically
			// "member_1" :{
			// 	"name" : "",
			// 	"intro" : ""
			// },
		},
		"bp_file" : {
			"file_name" : "",
			"file_path" : ""
		},

		"contact" : {
			"name" : "",
			"email" : "",
			"address" : "",
			"phone" : ""
		}
	},
	"reg_time" : timestamp,
	"readed" : {
		"Randy" : {
			"readed_time" : timestamp,
			"readed_flag" : true
		},
		"Walter" : {
			"readed_time" : timestamp,
			"readed_flag" : false
		}
	},
	"_id": null,

};
var team_info = schema.team_info;

function to_object(req,res){
	//add the member_brief coloumn dynamically 
	team_info.team_name = req.body.team_name;
	team_info.product_brief = req.body.product_brief;
	
	console.log(team_info.member_brief);
	console.log("Start to input members to the member_brief field");

	for(var i =0; i<req.body.member_brief_name.length;i++){

		team_info.member_brief= { member_name: //how can I change the member_name with the variable i
									{"name":req.body.member_brief_name[i],"info":req.body.member_brief_info[i]}};
	}

	console.log("Start to log the member_brief object");
	console.log(team_info.member_brief);

	team_info.contact.name = req.body.contact;
	team_info.contact.email = req.body.email;
	team_info.contact.address = req.body.address;
	team_info.contact.phone = req.body.phone;
	team_info.bp_file.file_name = req.file.filename;
	team_info.bp_file.file_path = req.file.path;
	return team_info;//team_info is already an object
}

function file_handler(req,res,field_name,callback){
	
	var upload = multer({ storage: storage1 }).single(field_name); // declare a multer object
	upload(req,res,function(err){
		if(!err){
			console.log(req.file);
			callback(err,req,res);
		}else{
			console.log(err);
		}
	});

}

exports.to_object = to_object;  //enter a json varible when call the function  
exports.file_handler = file_handler;
