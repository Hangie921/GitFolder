// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {

    $('#fullpage').fullpage({  //the fullpage start

    });

    var machine3 = $('#slot3').slotMachine({
    	active : 1,
    	delay : 6000,
    	auto : true,
    	spins : true
    });


	$("#slotButton3").click(function(){
		machine3.stop();
	});

});
