// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {

    $('#fullpage').fullpage({  //the fullpage start

    });

    var machine2 = $('#slot2').slotMachine({
    	active : 1,
    	delay : 1000
    });

    var machine3 = $('#slot3').slotMachine({
    	active : 1,
    	delay : 1000
    });

    $("#slotButton2").click(function(){
		$('#slot2 .slot:nth-child(3)').css({'visibility':'visible'});
		machine2.shuffle(5,function(){
			// location.href = '/contact_us';
		});
	});

	$("#slotButton3").click(function(){
		$('#slot3 .slot:nth-child(3)').css({'visibility':'visible'});
		machine3.shuffle(5,function(){
			$.fn.fullpage.moveTo(3, 0);
		});
	});

});
