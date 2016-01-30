// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {

	//initial the fullpage
    $('#fullpage').fullpage({  //the fullpage start

    });


    //The slot Machine part
    var machine3 = $('#slot3').slotMachine({
    	active : 0,
    	delay : 6000,
    	auto : true
    });

	$("#slotButton3").click(function(){
			machine3.futureActive = 3;
			machine3.stop();
			machine3.shuffle(1,function(){
				setTimeout(function(){
					$.fn.fullpage.moveTo(3, 0);
				},3000);
			})
	});

	//The rocket animation
	

});
