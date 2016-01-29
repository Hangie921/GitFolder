var crypto = require('crypto');


var encrypt = function (password, callback) {
    var hash = crypto.createHash('md5');
    
    hash.update(password);
    var md5 = hash.digest('hex');

    callback(md5); //return the md5 encoded string
    
    }

exports.encrypt = encrypt;

