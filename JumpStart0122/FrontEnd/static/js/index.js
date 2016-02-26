// this is the js that contain and execute the all Front-End related js
var ww;
var wh;

function resize(){
	ww = window.innerWidth;
	wh = window.innerHeight;
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
				// alert('anchorLink:'+anchorLink+',index:'+index+',slideIndex:'+slideIndex+',nextSlideIndex:'+nextSlideIndex);
				switch(anchorLink){
					case 'jumpnow':
						if(slideIndex == 0 && index == 4){
							if(!$('#sec_jumpnow.timeLineAni').hasClass('opacity')){
								$('#sec_jumpnow.timeLineAni').addClass('opacity');
							}
						}else if(nextSlideIndex == 0){
							if($('#sec_jumpnow.timeLineAni').hasClass('opacity')){
							   $('#sec_jumpnow.timeLineAni').removeClass('opacity');
							}
						}
					break;
					case 'competition':
						if(nextSlideIndex == 1 && slideIndex ==0){
							
						}
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
							
							if(!$('#competition_sponsor_slide .border_container').hasClass('borderRightAni')){ //border animation
								$('#competition_sponsor_slide .border_container').addClass('borderRightAni');
							}
						break;
					}
				}else if (anchorLink === 'jumpnow'){
					switch(slideIndex){
						case 0:
						break;
						case 1:
							var height = $('.team_details .slide-inner').height();
							$('.team_details .slide-inner').height(height);
							if(!$('.team_details .slide-inner .border_container').hasClass('borderRightAni')){
								$('.team_details .slide-inner .border_container').addClass('borderRightAni');
							}
						
						break;
						case 2:
							
							if(!$('.personal_details .slide-inner .border_container').hasClass('borderRightAni')){
								$('.personal_details .slide-inner .border_container').addClass('borderRightAni');
							}
							
						break;
					}
				}
			},
			onLeave: function(index, nextIndex, direction) {
				$('#header').css({'opacity':'0'}).removeClass('fff').removeClass('orange');
			},
			afterRender:function(){
				 var info_height = $('#competition_info_slide .slide-inner').height();
				$('#competition_info_slide .slide-inner .border_container').height(info_height);
				$('.team_details .slide-inner').height($('.team_details .slide-inner').height());
				$('#competition_topic_slide .border_container').height($('#competition_topic_slide .slide-inner').height());
				$('.personal_details .slide-inner').height($('.personal_details .slide-inner').height());
				var height = $('#competition_sponsor_slide .slide-inner').height();
				$('#competition_sponsor_slide .border_container').height(height);
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
		$.fn.fullpage.setLockAnchors(false);

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
	var contact_height = $('.contact_container').height();
	$('.contact_container').css('bottom',contact_height*-0.9);
	$('.contact_header').click(function(){
		if(down){
			$(this).parent().animate({'bottom':'0px'},1000);
			$('.contact_header div h2 span').html('<i class="fa fa-angle-down"></i>');
			down = false;
		}else{
			$(this).parent().animate({'bottom':contact_height*-0.9},1000);
			$('.contact_header div h2 span').html('<i class="fa fa-angle-up"></i>');
			down = true;
		}
	});
	

	
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
    $("#contact_us_form input").focus(function(){
    	$(this).next().children().next().empty();
    });


/********to validate the previous part of the reg_form*/

   var err_msg=['恩?隊伍名稱？','你做什麼產品？','隊友名稱呢?','隊友走哪路？','說好的BP呢？(.pdf)'];
   //to validate the team_details input field 
   	$("#sec_jumpnow a.next_btn").click(function(){
  
   		var $member_name = $("#sec_jumpnow input[name$='member_brief_name']");// may be string or array
   		var $member_info = $("#sec_jumpnow input[name$='member_brief_info']");// may be string or array

   		//*start to validate the left part*//
   		var input_counter = 0; // this counter is for the .team_other
		if($(".team_other:nth-of-type(1) input").val()==''){
			input_counter++;
			$(".team_other:nth-of-type(1) input").attr('placeholder',err_msg[0]);
		}
		if($(".team_other:nth-of-type(2) textarea").val()==''){
			input_counter++;
			$(".team_other:nth-of-type(2) textarea").attr('placeholder',err_msg[1]);
		}
   		if(input_counter === 0){ //means none is empty;
   			input_counter = true;
   		}else{
   			input_counter = false;
   		}
		
		
		/*****THIS IS THE FILE PART*****/   		
		if($("input[type$='file']").val()!==''){
			var file_counter = true;
		}else{
			var file_counter = false;
			$(".file-upload-input").empty().append(err_msg[4]);
		}

   		/*start to validate the member part*/
   		var name_counter = 0;
   		var info_counter = 0;
   		// alert($member_name.length);

		$member_name.each(function(){
			name_counter = checkVal($(this),name_counter);
		});
		$member_info.each(function(){
			info_counter = checkVal2($(this),info_counter);
		})

		if(name_counter > 0 || info_counter > 0){//means none is empty
			name_counter = false;
		}else{
			name_counter = true;
		}
		

   		if(input_counter && name_counter && file_counter){      // two groups of counter must be true to next slide
   			$.fn.fullpage.moveTo('jumpnow',2);
   		}else{
   			btn_error($(this));
   		}
   	});

   	function checkVal(element,counter){ // if any of val() is empty, counter will >0
   		if(element.val()==''){
   			counter++;
   			element.attr('placeholder',err_msg[2]);
   		}
   		return counter;
   	}
   	function checkVal2(element,counter){ // if any of val() is empty, counter will >0
   		if(element.val()==''){
   			counter++;
   			element.attr('placeholder',err_msg[3]);
   		}
   		return counter;
   	}



    /*to validate the reg_form*/
	var validator = $("#reg_form").validate({
		errorPlacement: function(error, element) {
			// Append error within linked label
			if(element.attr("name")!=="BP_file"){
				$(element).closest("form").find("input[name$="+element.attr("name")+"]").next().children().next().empty().append(error.text());
				if(element.is("textarea")){
					element.empty().attr("placeholder",error.text())
				}else if(element.attr("id")=='agree'){
					$(element).next().next().empty().append(error.text());
				}	
			}else{
				$(element).next().empty().append(error.text());
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
				required:true,
				extension:"pdf"
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
            $("#sec_jumpnow input").attr("placeholder","");
            $(".file-upload-input").empty().append("限定.pdf");
		}
		else{
			btn_error(btn)
		}
	});

	/*==========This is the product_brief textarea Counter*/
	$('#product_brief').keyup(function(){
		$('#counter').html((200-$(this).val().length));
	});

	/**active the customfile function**/
	$("#file").customFile();

});//end of the document.ready


//=====================For the input File===========================*//
;(function($) {
  // Browser supports HTML5 multiple file?
  var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
    isIE = /msie/i.test(navigator.userAgent);

  $.fn.customFile = function() {

    return this.each(function() {

      var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
        $wrap = $('<div class="file-upload-wrapper">'),
        // $input = $('<input type="text" class="file-upload-input" />'),
        $input = $("<span class='file-upload-input'>限定.pdf</span>"),
        // Button that will be used in non-IE browsers
        $button = $('<button type="button" class="file-upload-button">上傳商業計劃書</button>'),
        // Hack for IE
        $label = $('<label class="file-upload-button" for="' + $file[0].id + '">上傳商業計劃書</label>');

      // Hide by shifting to the left so we
      // can still trigger events
      $file.css({
        position: 'absolute',
        left: '-9999px'
      });

      $wrap.insertAfter($file)
        .append($file, $input, (isIE ? $label : $button));

      // Prevent focus
      $file.attr('tabIndex', -1);
      $button.attr('tabIndex', -1);

      $button.click(function() {
        $file.focus().click(); // Open dialog
      });

      $file.change(function() {

        var files = [],
          fileArr, filename;

        // If multiple is supported then extract
        // all filenames from the file array
        if (multipleSupport) {
          fileArr = $file[0].files;
          for (var i = 0, len = fileArr.length; i < len; i++) {
            files.push(fileArr[i].name);
          }
          filename = files.join(', ');

          // If not supported then just take the value
          // and remove the path to just show the filename
        } else {
          filename = $file.val().split('\\').pop();
        }

        $input.html(filename) // Set the value
          .attr('title', filename) // Show filename in title tootlip
          .focus(); // Regain focus

      });

      $input.on({
        blur: function() {
          $file.trigger('blur');
        },
        keydown: function(e) {
          if (e.which === 13) { // Enter
            if (!isIE) {
              $file.trigger('click');
            }
          } else if (e.which === 8 || e.which === 46) { // Backspace & Del
            // On some browsers the value is read-only
            // with this trick we remove the old input and add
            // a clean clone with all the original events attached
            $file.replaceWith($file = $file.clone(true));
            $file.trigger('change');
            $input.val('');
          } else if (e.which === 9) { // TAB
            return;
          } else { // All other keys
            return false;
          }
        }
      });

    });

  };

  // Old browser fallback
  if (!multipleSupport) {
    $(document).on('change', 'input.customfile', function() {

      var $this = $(this),
        // Create a unique ID so we
        // can attach the label to the input
        uniqId = 'customfile_' + (new Date()).getTime(),
        $wrap = $this.parent(),

        // Filter empty input
        $inputs = $wrap.siblings().find('.file-upload-input')
        .filter(function() {
          return !this.value
        }),

        $file = $('<input type="file" id="' + uniqId + '" name="' + $this.attr('name') + '"/>');

      // 1ms timeout so it runs after all other events
      // that modify the value have triggered
      setTimeout(function() {
        // Add a new input
        if ($this.val()) {
          // Check for empty fields to prevent
          // creating new inputs when changing files
          if (!$inputs.length) {
            $wrap.after($file);
            $file.customFile();
          }
          // Remove and reorganize inputs
        } else {
          $inputs.parent().remove();
          // Move the input so it's always last on the list
          $wrap.appendTo($wrap.parent());
          $wrap.find('input').focus();
        }
      }, 1);

    });
  }

}(jQuery));
//==============END OF THE CUSTOMIZED FILE INPUT=====================================================

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

