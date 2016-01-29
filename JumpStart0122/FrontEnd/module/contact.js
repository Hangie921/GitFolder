var multer= require("multer");
//setting above


var timestamp = null;
var contact = {
		"contact_us" : {
			"name" : "",
			"email" : "",
			"phone" : "",
			"msg" : ""
		},
		"reg_time" : timestamp,
		"readed" : {
			"Randy" : {
				"readed_time" : timestamp,
				"readed_flag" : false
			},
			"Walter" : {
				"readed_time" : timestamp,
				"readed_flag" : false
			}
		},
		"_id": null,

};

function to_object(req,res){
	//add the member_brief coloumn dynamically 
	contact.contact_us.name = req.body.user_name;
	contact.contact_us.email = req.body.user_email;
	contact.contact_us.phone = req.body.user_phone;
	contact.contact_us.msg = req.body.user_msg;
	contact.reg_time = Date.now();
	return contact;//team_info is already an object
}

function form_handle(req,res,callback){
	console.log('Uploading the detail');
	// pack the detail of the form into req.body
	var upload = multer().single();
	upload(req,res,function(err){
		if(!err){
			console.log("detail uploaded");
			callback(err,req,res);
		}else{
			console.log(err);
		}
	});

}

exports.to_object = to_object;  //enter a json varible when call the function  
exports.form_handle = form_handle;
