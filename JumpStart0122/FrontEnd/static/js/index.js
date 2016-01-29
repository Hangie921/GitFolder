// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {

    $('#fullpage').fullpage({  //the fullpage start

    });

    var machine2 = $('#slot2').slotMachine({
    	active : 1,
    	delay : 500
    });

    $("#slotButton").click(function(){
		$('.slot:nth-child(3)').css({'visibility':'visible'});
		machine2.shuffle(5,function(){
			// location.href = '/contact_us';
		});


		
	});

});
