var md5 = require('../module/md5'),
	multer = require('multer'),
	form = multer();




function checkDetail(detail,detail_mongo){ //check empty in the page
	if(detail.acc === detail_mongo.acc && detail.psw === detail_mongo.psw){
		return true;	
	}else{
		return false;
	}
	
}



function updateDetail(){ //update last_login_time , write session

}

exports.check = checkDetail;
exports.update = updateDetail;