var md5 = require('../module/md5'),
	multer = require('multer'),
	form = multer();



function checkDetail(detail){
	if(detail.acc!=null && detail.psw!=null){
		
	}
	//call the mongle handler() 
	//checkAcc
	//checkPsw
	//return status
}



function updateDetail(){ //update last_login_time , write session

}

exports.check = checkDetail;
exports.update = updateDetail;