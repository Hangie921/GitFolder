var multer= require("multer");
var log = require("../../SDK/log_handler");
//setting above

var schema = function(){
	var d = new Date();
	var sec = d.getSeconds().toString().length == 1?('0'+d.getSeconds()):d.getSeconds();
	var min = d.getMinutes().toString().length == 1?('0'+d.getMinutes()):d.getMinutes();
	var hour = d.getHours().toString().length == 1 ?('0'+d.getHours()):d.getHours();
	var timestamp = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate()+" "+hour+":"+min+":"+ sec;

	return {
		// "_id":Date.now(),
		"contact_us" : {
			"name" : "",
			"email" : "",
			"subject" : "",
			"msg" : ""
		},
		"reg_time" : timestamp,
		"readed" : {
			"Randy" : {
				"readed_time" : null,
				"readed_flag" : false
			},
			"Walter" : {
				"readed_time" : null,
				"readed_flag" : false
			}
		}
	};
}//end of the schema function

function to_object(req,res){
	var contact = schema();
	//add the member_brief coloumn dynamically 
	contact.contact_us.name = req.body.user_name;
	contact.contact_us.email = req.body.user_email;
	contact.contact_us.subject = req.body.subject;
	contact.contact_us.msg = req.body.user_msg;
	return contact;//team_info is already an object
}

function form_handle(req,res,callback){
	// console.log('Uploading the detail');
	log.info("Uploading the detail from contact form");
	// pack the detail of the form into req.body
	var upload = multer().single();
	upload(req,res,function(err){

		if(err){
			log.error("Unexpected error while uploading the details")
			log.error(err);
		}else{
			log.info("detail uploaded");
			
			callback(null,req,res);
		}
	});

}

exports.to_object = to_object;  //enter a json varible when call the function  
exports.form_handle = form_handle;
