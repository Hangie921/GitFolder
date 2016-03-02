function empty_session(sess){
	sess.destroy();
}

exports.empty_session=empty_session;