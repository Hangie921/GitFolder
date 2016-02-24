// this is the js that contain and execute the all Front-End related js
var ww;
var wh;

function resize(){
	ww = window.innerWidth;
	wh = window.innerHeight;
	$.fn.fullpage.reBuild();
}

$(window).resize(function(){
	resize();
	console.log('resize');
});

$(document).ready(function() {
	ww = window.innerWidth;
	wh = window.innerHeight;

	initSlot();	//initial the slot machine first so that fullpage can load the
	
	//initail the .team_details height so it won't move after loading
	

	//initial the fullpage with the rocket animation
    	$('#fullpage').fullpage({
	    	menu:'#header',
	    	anchors:['home','about','competition',
	    			'jumpnow','events'
	    	],
	    	scrollingSpeed:1000,
			afterLoad: function(anchorLink, index) { 
				$.fn.fullpage.setKeyboardScrolling(false);//disable the Keyboard scrolling
				$('#header').css({'opacity':'1'});
				 switch(index){ //this is the function that chnages the bgcolor and color of the #header
			    	case 1:
			    		$('#competition_menu li:nth-child(1) a').addClass('selected');
			    		machine3.shuffle();
			    		break;
					case 2:
						$('#header').addClass('orange');
						if(!$('#sec_about .border_container').hasClass('straightAni')){ //border animation
							$('#sec_about .border_container').addClass('straightAni');
							$('#sec_about').addClass('timeLineAni');
						}
						break;
					case 3:
						$('#header').addClass('fff');
						var height = $('#competition_topic_slide .slide-inner').height();
							$('#competition_topic_slide .border_container').height(height);

						if(!$('#competition_topic_slide').hasClass('timeLineAni')){ //border animation
							$('#competition_topic_slide').addClass('timeLineAni');
						}
							
						if(!$('#competition_topic_slide .border_container').hasClass('borderRightAni')){ //border animation
							$('#competition_topic_slide .border_container').addClass('borderRightAni');
						}
						break;
					case 4:
						$('#header').addClass('orange');
						if(!$('#sec_jumpnow .jumpnow_part1 .slide-inner .border_container').hasClass('borderRightAni')){
							$('#sec_jumpnow .jumpnow_part1 .slide-inner .border_container').addClass('borderRightAni');
						}
						if(!$('#sec_jumpnow').hasClass('timeLineAni')){
							$('#sec_jumpnow').addClass('timeLineAni');
						}
						if(!$('#border_btn').hasClass('borderRightAni')){
							$('#border_btn').addClass('borderRightAni');
						}

						break;
					case 5:
						$('#header').addClass('fff');
						break;
				}
			},
			onSlideLeave:function(anchorLink, index, slideIndex, direction, nextSlideIndex){
				var leavingSlide = $(this);
				if(nextSlideIndex == 1){
					var height = $('.team_details .slide-inner').height();
					$('.team_details .slide-inner').height(height);	
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
							var height = $('#competition_info_slide .slide-inner').height();
							$('#competition_info_slide .border_container').height(height);
							if(!$('#competition_info_slide .border_container').hasClass('borderRightAni')){ //border animation
								$('#competition_info_slide .border_container').addClass('borderRightAni');
							}
						break;
						case 2:
							$('#competition_menu li:nth-child(3) a').addClass('selected');
							var height = $('#competition_prize_slide .slide-inner').height();
							$('#competition_prize_slide .border_container').height(height);
							if(!$('#competition_prize_slide .border_container').hasClass('borderRightAni')){ //border animation
								$('#competition_prize_slide .border_container').addClass('borderRightAni');
							}
						break;
						case 3:
							$('#competition_menu li:nth-child(4) a').addClass('selected');
							var height = $('#competition_sponsor_slide .slide-inner').height();
							$('#competition_sponsor_slide .border_container').height(height);
							if(!$('#competition_sponsor_slide .border_container').hasClass('borderRightAni')){ //border animation
								$('#competition_sponsor_slide .border_container').addClass('borderRightAni');
							}
						break;
					}
				}else if (anchorLink === 'jumpnow'){
					switch(slideIndex){
						case 1:
							var height = $('.team_details .slide-inner').height();
							$('.team_details .slide-inner').height(height);
							if(!$('.team_details .slide-inner .border_container').hasClass('borderRightAni')){
								$('.team_details .slide-inner .border_container').addClass('borderRightAni');
							}
						
						break;
						case 2:
							var height = $('.personal_details .slide-inner').height();
							$('.personal_details .slide-inner').height(height);
							if(!$('.personal_details .slide-inner .border_container').hasClass('borderRightAni')){
								$('.personal_details .slide-inner .border_container').addClass('borderRightAni');
							}
							
						break;
					}
				}
			},
			onLeave: function(index, nextIndex, direction) {
				$('#header').css({'opacity':'0'}).removeClass('fff').removeClass('orange');
			    if(nextIndex == 2 && $(window).width()>468){
			    	if(!$('.rocket').hasClass('rocket_ani'))
			    		$('.rocket').addClass('rocket_ani');
			    }else{
			    	$('.rocket').hide();
			    }
			},
			verticalCentered : true,
			resize : false,
			fitToSectionDelay:500,
			fixedElements:'.backToTop,header,.scrollDown',
			loopBottom:false,
			loopTop:false,
			loopHorizontal:false,
			recordHistory:false,
			controlArrows:false,
			responsiveWidth:990


		}); //end of the fullpageJS initial

		//menu hamburger
 
 		$('.menu-burger, .menu-items-mobile').on('click', function() {
 		 $('.menu-bg, .menu-items-mobile, .menu-burger').toggleClass('fs');
  		$('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
		});

		// menu hamburger ends
	
    
	//add and delete the member input field dynamically with the btn clicked
	var DOM = "<div class='team_detail_single clearfix'><span class='input input--hoshi team_member'><input id='input-4' type='text' name='member_brief_name' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>成員</span><span class='input__label-content input__label-content--hoshi reminder'></span></label></span><span class='input input--hoshi responsibility'><input id='input-4' type='text' name='member_brief_info' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>負責項目</span><span class='input__label-content input__label-content--hoshi reminder'></span></label></span><button id='del_member' class='button del_btn'></button></div>";
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
	if(ww>990){
		$('.contact_container').css('top','80%');
		$('.contact_header').click(function(){
			if(down){
				$(this).parent().animate({'top':'25%'},1000);
				$('.contact_header div h2 span').html('<i class="fa fa-angle-down"></i>');
				down = false;
			}else{
				$(this).parent().animate({'top':'80%'},1000);
				$('.contact_header div h2 span').html('<i class="fa fa-angle-up"></i>');
				down = true;
			}
		});
	}else if(ww <= 990 && ww > 768){

		$('.contact_header').click(function(){
			if(down){
				$(this).parent().animate({'bottom':'0px'},1000);
				$('.contact_header div h2 span').html('<i class="fa fa-angle-down"></i>');
				down = false;
			}else{
				$(this).parent().animate({'bottom':'-380px'},1000);
				$('.contact_header div h2 span').html('<i class="fa fa-angle-up"></i>');
				down = true;
			}
		});
	}
	
	
	$('#reg_form').submit(function() {
		var btn = $('button.submit_btn');
        sub_form_check(btn,$(this));
        return false;
    });

    $('#contact_us_form').validate({
    	errorPlacement: function(error, element) {
			// Append error within linked label
			$( element ).closest( "form" ).find( "label[for='" + element.attr( "id" ) + "']" ).find('span').next().empty().append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;').append( error.text() );
			if(element.is("textarea")){
				element.empty().attr("placeholder",error.text())
			}
			// element.attr("placeholder",error.text()).parent().addClass('input--filled');
		},

		debug: false,
		success: 'valid',
		rules:{
			user_name:"required",
			user_email:{
				required:true,
				email:true
			},
			subject:"required",
			user_msg:"required"
		},
		messages:{

		}
	});


    //to empty the error msg
    $("#reg_form input").focus(function(){
    	$(this).next().children().next().empty();
    });

	$("#reg_form").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			$( element ).closest("form").find("input[name$="+element.attr("name")+"]").next().children().next().empty().append(error.text());
			if(element.is("textarea")){
				element.empty().attr("placeholder",error.text())
			}
			// element.attr("placeholder",error.text()).parent().addClass('input--filled');

			
		},
		debug: false,
		success: 'valid',
		rules: {
			team_name:"required",
			product_brief:{
				minlength:3,
				required:true
			},	
			BP_file:{

			},
			member_brief_name:"required",
			member_brief_info:"required",
		    contact: {
		    	required: true
		    },
		    phone: {
		    	required: true
		    },
		    email:{
		    	required: true,
		    	email: true
		    },
		    address:{
		    	required: true
		    },
		    agree:{ // agree checkbox
		    	required:true
		    }
		},
		messages:{

		}

	});

    $('#contact_btn').click(function(){
		var btn = $('a.contact_us_btn');
		var contact_form = $('#contact_us_form')
		if(contact_form.valid()){  
            submit_to_db(btn,contact_form);
		}
		else{
			btn_error(btn)
		}
	});

	$('#reg_btn').click(function(){
		var btn = $('a.submit_btn');
		var reg_form = $('#reg_form')
		if(reg_form.valid()){  
            submit_to_db(btn,reg_form);
		}
		else{
			btn_error(btn)
		}

	});

	/*==========This is the product_brief textarea Counter*/
	$('#product_brief').keyup(function(){
		$('#counter').html((200-$(this).val().length));
	});

});//end of the document.ready

//===================================================================


function btn_error(btn){
	var color = btn.css('color');
	var bg = btn.css('background-color');
	btn.addClass('btn-error');
	btn.css({'color':bg});
	setTimeout(function(){
		btn.removeClass('btn-error');
	}, 1000);
	setTimeout(function(){
		btn.css({'color':color});
	}, 1100);

}

function submit_to_db(btn,form){ 
//submit to db with Ajax and animation feedback
	var color = btn.css('color');
    var bg = btn.css('background-color');
       form.ajaxSubmit({
            error: function(xhr) {
            	console.log('xhr');
        		console.log(xhr);
        		btn.addClass('btn-error');
        		btn.css({'color':bg});
				setTimeout(function(){
					btn.removeClass('btn-error');
				}, 1000);
				setTimeout(function(){
					btn.css({'color':color});
				}, 1100);
            },
            success: function(response) {
            	console.log('res');
                console.log(response);
                btn.addClass('btn-success');
                btn.css({'color':bg});
				setTimeout(function(){
					btn.removeClass('btn-success');
				}, 1000);
				setTimeout(function(){
					btn.css({'color':'#fff'});
				}, 1100);
				form.resetForm();
            }
    	});
        //Very important line, it disable the page refresh.
}


//The slot Machine animation initializing
function initSlot(){
	machine3 = $('#slot3').slotMachine({
    	active : 0,
    	delay : 14000,
    	auto : true,
    	stopHidden : false,
    	direction : 'down'
	});

	$('#slotButton3').click(function(){
			machine3.futureActive = 7;
			machine3.stop();
			if(!$('#sec_home .border_container').hasClass('straightAni')){ //border animation
				$('#sec_home .border_container').addClass('straightAni');
				$('#sec_home').addClass('timeLineAni');
			}
			setTimeout(function(){
				$.fn.fullpage.moveTo('about');
			}, 1000);
	});
}

