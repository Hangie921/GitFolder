// this is the js that contain and execute the all Front-End related js

$(document).ready(function() {

	//initial the fullpage
    $('#fullpage').fullpage({  //the fullpage start

    });


    //The slot Machine animation
    var machine3 = $('#slot3').slotMachine({
    	active : 0,
    	delay : 6000,
    	auto : true
    });

	$('#slotButton3').click(function(){
			machine3.futureActive = 3;
			machine3.stop();
			machine3.shuffle(1,function(){
				setTimeout(function(){
					$.fn.fullpage.moveTo(3, 0);
				},3000);
			})
	});



	//add the member input dynamically
	var DOM = "<div class='col-md-4'><div class='team_detail_single'><span class='input input--hoshi'><input id='input-4' type='text' name='member_brief_name' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>成員</span></label></span><span class='input input--hoshi'><input id='input-4' type='text' name='member_brief_info' class='input__field input__field--hoshi'/><label for='input-4' class='input__label input__label--hoshi input__label--hoshi-color-1'><span class='input__label-content input__label-content--hoshi'>負責項目</span></label></span><button id='del_member' class='button del_btn'>刪除成員</button></div>";

	$('#add_member').click(function(event){
			
			event.preventDefault();
			$('#sec_jumpnow .team_details').append(DOM);

			$('.del_btn').click(function(event){
				event.preventDefault();
				$(this).parent().parent().remove();
			});	
		
		

	});

	//delete the member input dynamically
	

});
