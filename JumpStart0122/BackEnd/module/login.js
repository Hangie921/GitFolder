var md5 = require('../module/md5'),
	multer = require('multer'),
	form = multer();




function checkDetail(detail,detail_mongo){ //check empty in the page
	

	//call the mongle handler() 
	//checkAcc
	//checkPsw
	//return status
	return true;
}



function updateDetail(){ //update last_login_time , write session

}

exports.check = checkDetail;
exports.update = updateDetail;