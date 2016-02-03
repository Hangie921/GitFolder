// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {
	
	initSlot();//initial the slot machine first so that fullpage can load the
			   //'machine3	'
	//initial the fullpage with the rocket animation
    $('#fullpage').fullpage({
    	menu:'#header',
    	anchors:['home','about','competition',
    			'jumpnow','events'
    	],
    	scrollingSpeed:1000,
    	resize:true,
    	//determin what to do after the loading of the each sections
		afterLoad: function(anchorLink, index) { 
			$.fn.fullpage.setKeyboardScrolling(false);//disable the Keyboard scrolling
			$('#header').css({'opacity':'1'});
			 switch(index){ //this is the function that chnages the bgcolor and color of the #header
		    	case 1:
		    		// machine3.auto();
		    		$('.backToTop').hide();
		    		break;
				case 2:
					$('#header').addClass('orange');
					break;
				case 3:
					$('#header').addClass('fff');
					break;
				case 4:
					$('#header').addClass('orange');
					break;
				case 5:
					$('#header').addClass('fff');
					break;
			}
		},
		afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
			if(anchorLink == 'competition'){
				$('#competition_menu li a').removeClass('selected');
				switch(slideIndex){
					case 0:
						$('#competition_menu li:nth-child(1) a').addClass('selected');
					break;
					case 1:
						$('#competition_menu li:nth-child(2) a').addClass('selected');
					break;
					case 2:
						$('#competition_menu li:nth-child(3) a').addClass('selected');
					break;
				}
			}
		},
		onLeave: function(index, nextIndex, direction) {
			$('.backToTop').show();
			$('#header').css({'opacity':'0'}).removeClass('fff').removeClass('orange');
		    if(nextIndex == 2){
		    	$('.rocket').addClass('rocket_ani');
		    }else if (index == 2) {
		    	setTimeout(function(){
		    		$('.rocket').removeClass('rocket_ani'); 
		    	}, 1000);
		    }else if(index ==1){
		    	machine3.futureActive = 7;
				machine3.stop();
		    }
		},// end of the onLeave function
		verticalCentered : true,
		resize : false,
		fitToSectionDelay:500,
		fixedElements:'.backToTop,header',
		loopBottom:false,
		loopTop:false,
		loopHorizontal:false,
		recordHistory:false,
		// responsiveWidth: 700,
  //       responsiveHeight: 300

	});


    //The slot Machine animation initializing
    function initSlot(){
    	machine3 = $('#slot3').slotMachine({
	    	active : 0,
	    	delay : 14000,
	    	auto : true
    	});
		$('#slotButton3').click(function(){
				machine3.futureActive = 7;
				machine3.stop();
				setTimeout(function(){
					$.fn.fullpage.moveTo(3);
				}, 1800);
		});
    }

	//add and delete the member input field dynamically with the btn clicked
	var DOM = "<div class='team_detail_single clearfix'><span class='input input--hoshi team_member '><input id='input-4' type='text' name='member_brief_name' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>成員</span></label></span><span class='input input--hoshi responsibility'><input id='input-4' type='text' name='member_brief_info' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>負責項目</span></label></span><button id='del_member' class='button del_btn'>刪除成員</button></div>";
	var counter = 1;
	$('#add_member').click(function(event){
			event.preventDefault();
			$(this).before(DOM);
			$(this).prev().children('.del_btn').click(function(event){
				event.preventDefault();
				$(this).parent().remove();
				counter = counter - 1;
				if(counter!=5){
					$('#add_member').show();
				}

			});	

			//add the input--filled class to maintain the animation
			$('.team_detail_single').last().children().children('input.input__field').focus(function(){
				$(this).parent().addClass('input--filled');
			}).blur(function(){
				if($(this).val()===''){
					$(this).parent().removeClass('input--filled');
				}
			});

			counter = counter + 1;
			if(counter==5){
				$(this).hide();
			}
	}); //end of the #add_member clicked


	//the contact form ani,to show or hide the contact form
	var down = true;
	$('.contact_header').click(function(){
		if(down){
			$(this).parent().animate({'top':'50%'},1000);
			$('.contact_header div h2 span').html('<i class="fa fa-angle-up"></i>');
			down = false;
		}else{
			$(this).parent().animate({'top':'80%'},1000);
			$('.contact_header div h2 span').html('<i class="fa fa-angle-down"></i>');
			down = true;
		}

	});
	
	//the events section flip motion

	
	



});
