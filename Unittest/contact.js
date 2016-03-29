var request = require('request');

//Lets configure and request
request({
    url: 'http://localhost:3000/contact', //URL to hit
    // qs: {from: 'blog example', time: +new Date()}, //Query string data
    method: 'POST',
    //Lets post the following key/values as form
    json: {
        user_name: 'randy',
        user_email: 'randy@ping.com.sg',
   		subject: 'Test', 
   		user_msg: 'Testttt'

    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
}
});
// var requestify = require('requestify');

// requestify.post('http://localhost:3000/contact', {
//     'user_name': 'randy', 
//     'user_email': 'randy@ping.com.sg', 
//     'subject': 'Test', 
//     'user_msg': 'Testttt'
// })
// .then(function(response) {
//     // Get the response body (JSON parsed or jQuery object for XMLs)
//     response.getBody();
// });