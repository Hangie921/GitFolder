// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {
	//initial the fullpage with the rocket animation
    $('#fullpage').fullpage({
    	menu:'#main_menu',
    	anchors:['home','about','competition',
    			'jumpnow','events'
    	],
    	scrollingSpeed:1000,
    	resize:true,
		afterLoad: function(anchorLink, index) {
			$.fn.fullpage.setKeyboardScrolling(false);
		    if (index == 2) {
		    	$('.rocket').animate({
		        	left: "30%",
		        	top: "10%"
		      	}, 1000);
		    }
		},
		afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
			
		},
		onLeave: function(index, nextIndex, direction) {
		    if (index == 2 && (nextIndex == 3 || nextIndex == 1)) {
		    	$('.rocket').animate({
		    		left: "0",
		    		top: "80%"
		      	}, 1000); 
		    }
		},// end of the onLeave function
		verticalCentered : true,
		resize : false

	});


    //The slot Machine animation
    var machine3 = $('#slot3').slotMachine({
    	active : 0,
    	delay : 14000,
    	auto : true

    });

	$('#slotButton3').click(function(){
			machine3.futureActive = 7;
			machine3.stop();
			setTimeout(function(){
				$.fn.fullpage.moveTo(3);
			}, 5000);
	});



	//add and delete the member input dynamically
	var DOM = "<div class='team_detail_single'><span class='input input--hoshi'><input id='input-4' type='text' name='member_brief_name' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>成員</span></label></span><span class='input input--hoshi'><input id='input-4' type='text' name='member_brief_info' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>負責項目</span></label></span><button id='del_member' class='button del_btn'>刪除成員</button></div>";
	var counter = 1;
	$('#add_member').click(function(event){
			event.preventDefault();
			$(this).prev().append(DOM);
			counter += 1;
			$('.del_btn').click(function(event){
				event.preventDefault();
				$(this).parent().remove();
				counter-=1;
			});	
			if(counter==5){
				$(this).hide();
			}else{
				$(this).show();
			}
		
	});

	//animate the rocket
	



});
