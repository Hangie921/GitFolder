var login = require('../module/login'),
    bodyParser = require('body-parser'),
    mongo_handler = require('../../SDK/mongo_handler'),
    log = require("../../SDK/log_handler");

function route(app, mongoClient) {
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

    app.get('/contact_info/:country', function(req, res) {
        //session
        var sess = req.session
        if (sess.login_status === undefined || sess.login_status === null || sess.login_status === false) {
            res.redirect('/');
            res.end();
        }
        // get country
        var country = req.params.country
        var query = {};
        // console.log(country);
        if (country != "all") {
            query = { 'contact_us.country': country };
        }

        var condition = {
            projection: { "_id": 0 },
            sort: {},
            skip: 0,
            limit: 0
        };
        var result = {};
        mongo_handler.handle(mongoClient, 'find', null, 'contact', query, condition, function(err, status, mongo_result) {

            if (err) {
                console.log('error while loading the docs from contact collection');
                console.log(err);
                log.error("error while loading the docs from contact collection");
                log.error(err);

            } else if (status === false) {
                console.log('mongo return nothing');
                log.info("mongo found nothing here");
                log.error(err);
            } else {
                console.log('result: ' + result);
                log.info('result: ' + JSON.stringify(result));
                result = mongo_result;
                // console.log(JSON.parse(JSON.stringify(result)));
                // res.render('index',{results:JSON.parse(JSON.stringify(result))});

                // res.render('index',{results:result});

            }
            res.render('contact_info', {
                results: JSON.parse(JSON.stringify(result)),
                country: country,
                user: sess.user
            });
            res.end();

        });


    });


    // you need to set mergeParams: true on the router,
    // if you want to access params from the parent router
    // var country_router = app.router({mergeParams: true});
    // country_router.get('/contact_info/:show_option', function(req, res) {
    // 	var show_option_query= { 'contact_us.country' : null };
    // 	condition = {
    // 		projection:{"_id":0},
    // 		sort:{},
    // 		skip:0,
    // 		limit:0
    // 	};
    // 	show_option_query['contact_us.country'] = req.params.show_option

    // 	mongo_handler.handle(mongoClient,'find',null,'contact',show_option_query,condition,function(err,status,result){
    // 		if(err){
    // 			console.log('error while loading the docs from contact collection');
    // 			console.log(err);
    // 		}else if(status === false){
    // 			console.log('mongo return nothing');
    // 			res.send('mongo find nothing');
    // 		}else{
    // 			console.log('result: '+ result);
    // 			console.log("send the doc to jade");
    // 			// console.log(JSON.parse(JSON.stringify(result)));
    // 			// res.render('index',{results:JSON.parse(JSON.stringify(result))});
    // 			res.render('contact_info',{results:JSON.parse(JSON.stringify(result))});
    // 			// res.render('index',{results:result});
    // 			res.end();
    // 		}

    // 	});



    //     res.render('contact_info',{results:JSON.parse(JSON.stringify(result))});
    // 			// res.render('index',{results:result});
    // 	res.end();
    // });
}

// function route_tw(app, mongoClient){
// 	app.get('/contact_info_tw',function(req,res){
// 		var query = {'contact_us.country' : 'tw'};
// 		condition = {
// 			projection:{"_id":0},
// 			sort:{},
// 			skip:0,
// 			limit:0
// 		};
// 		mongo_handler.handle(mongoClient,'find',null,'contact',query,condition,function(err,status,result){
// 			if(err){
// 				console.log('error while loading the docs from contact collection');
// 				console.log(err);
// 			}else if(status === false){
// 				console.log('mongo return nothing');
// 				res.send('mongo find nothing');
// 			}else{
// 				console.log('result: '+ result);
// 				console.log("send the doc to jade");
// 				// console.log(JSON.parse(JSON.stringify(result)));
// 				// res.render('index',{results:JSON.parse(JSON.stringify(result))});
// 				res.render( 'contact_info',
// 							{
// 								results:JSON.parse(JSON.stringify(result)), 
// 								country : "tw"
// 							}
// 						);
// 				// res.render('index',{results:result});
// 				res.end();
// 			}

// 		});
// 	});

// }

// function route_sg(app, mongoClient){
// 	app.get('/contact_info_sg',function(req,res){
// 		var query = {'contact_us.country' : 'sg'};
// 		condition = {
// 			projection:{"_id":0},
// 			sort:{},
// 			skip:0,
// 			limit:0
// 		};
// 		mongo_handler.handle(mongoClient,'find',null,'contact',query,condition,function(err,status,result){
// 			if(err){
// 				console.log('error while loading the docs from contact collection');
// 				console.log(err);
// 			}else if(status === false){
// 				console.log('mongo return nothing');
// 				res.send('mongo find nothing');
// 			}else{
// 				console.log('result: '+ result);
// 				console.log("send the doc to jade");
// 				// console.log(JSON.parse(JSON.stringify(result)));
// 				// res.render('index',{results:JSON.parse(JSON.stringify(result))});
// 				res.render( 'contact_info',
// 							{
// 								results:JSON.parse(JSON.stringify(result)), 
// 								country : "tw"
// 							}
// 						);
// 				// res.render('index',{results:result});
// 				res.end();
// 			}

// 		});
// 	});
// }

exports.route = route;
// exports.route_tw = route_tw;
// exports.route_sg = route_tw;
