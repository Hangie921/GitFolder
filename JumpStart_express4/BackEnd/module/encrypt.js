var crypto = require('crypto');


function md5(password){
    var hash = crypto.createHash('md5');
    hash.update(password);
    var string = hash.digest('hex');
    return string; 		//return the md5 encoded string
};

exports.md5 = md5;

