var login = require('../module/login'),
    mongo_handler = require('../../SDK/mongo_handler'),
    log = require("../../SDK/log_handler");
var Team = require('../module/team.js');
var Member = require('../module/member.js');


function route(app, mongoClient) {
    app.get('/try', function(req, res) {
        // var temp = new Team();
        // temp.team_details.team_name = "M";
        // temp.save(function (err,status) {
        //  console.log(status);
        // });
        // Team.find(function(err, teams) {
        Team.find({ _id: "56fb8b3ec10bafa51367313d" }, function(err, teams) {
            if (err) return console.error(err);
            res.send(teams);
        })
    });

    app.get('/reg_info', function(req, res) {
        //session
        var sess = req.session
        console.log('session in "/reg_info"', sess);
        if (sess.login_status === undefined || sess.login_status === null || sess.login_status === false) {
            res.redirect('/');
            // res.render('index',{results:result});
            res.end();
        }

        sess.save();
        //query
        var query = {};
        var condition = {
            projection: { "_id": 0 },
            sort: {},
            skip: 0,
            limit: 0
        };
        var result = {};

        // mongo_handler.handle(mongoClient, 'find', null, 'detail', query, condition, function(err, status, mongo_result) { // For default
        mongo_handler.handle(mongoClient, 'find', null, 'application', query, condition, function(err, status, mongo_result) { // For pepper
            if (err) {
                log.error("error while loading the docs from contact collection");
                log.error(err);
            } else if (status === false) {
                log.info("mongo found nothing here");
                log.error(err);
            } else {
                result = mongo_result;
                // log.info('result: ' + JSON.stringify(result));
                // console.log('result: ', result[0]);
                // console.log('result: ', result);
            }
            // res.render('reg_info', { // For default
            res.render('reg_info_pepper', { // For pepper
                results: result,
                user: sess.user
            });
            res.end();

        });
    });

    app.get('/reg_info/:id', function(req, res) {
        var sess = req.session
        console.log('session in "/reg_info:id"', sess);
        Team.findById(req.params.id, function(err, team) {
            if (err) return console.error(err);
            res.render('reg_info_edit', {
                result: team
            });
        })
    });

    // PUT
    app.put('/reg_info/:id', function(req, res) {
        // update admin info
        var sess = req.session
        var adminInfo = {
            "last_editor_id": sess.user,
            "last_edit_time": new Date().toISOString()
        };

        // update team info
        var newTeam = req.body;
        newTeam.team_member = {};
        newTeam.paid = newTeam.paid == "true";
        newTeam.agree_subscribe = newTeam.agree_subscribe == "true";
        newTeam.agree_terms = newTeam.agree_terms == "true";

        for (var i = 0; i < newTeam.member_name.length; i++) {
            var newName = newTeam.member_name[i];
            var newEmail = newTeam.member_email[i];
            if (newName !== "" && newEmail !== "")
                newTeam.team_member["member_" + i] = { "name": newName, "email": newEmail };
        }
        delete newTeam.member_name;
        delete newTeam.member_email;

        Member.findOne({ acc: adminInfo.last_editor_id }, function(err, member) {
            // adminInfo.last_editor_id = member._id;
            console.log("adminInfo", adminInfo);
            
            // Team.findByIdAndUpdate(newTeam.id, { team_details: newTeam }, function(err, team) {
            Team.findByIdAndUpdate(newTeam.id, { team_details: newTeam, admin_detail: adminInfo }, function(err, team) {
                if (err) return console.error(err);
                res.send(team);
            });

        });

    });

}

exports.route = route;
