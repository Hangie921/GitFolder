function route(app, mongoClient) {

//	在這裡設定全域session load/save
    app.use(function(req, res, next) {
        var views = req.session.views

        if (!views) {
            views = req.session.views = {}
        }

        // get the url pathname 
        var pathname = req.pathname

        // count the views 
        views[pathname] = (views[pathname] || 0) + 1
        console.log("index.js", views)

        next()
    })

    app.get('/', function(req, res) {
        //session
        var sess = req.session
        console.log('session in "/"', sess);

        if (sess.login_status === undefined) {
            sess.login_status = false;
            sess.save();
        }

        res.render('index', { session_status: sess.login_status });
    });
}

exports.route = route;
