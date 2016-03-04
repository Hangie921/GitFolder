//Mobile js except the Fullpage.js



//==========================MOBILE COMPETITION SLIDE MENU==========


function revealOnScroll(){
	var offset = $("#sec_competition").offset();
	var menu = $("#competition_mobile_menu_container");
	var originalHeight = $("#sec_home").innerHeight() + $("#sec_about").innerHeight();
	var scrolled = $(window).scrollTop();
	// console.log("window:"+scrolled);
	// console.log("#competition:"+offset.top);
	menu.css("top",originalHeight);
	$('#sec_competition').each(function() {
		var current = $(this), // 當前元素
	    w_height = $(window).outerHeight(), //視窗高度
	    offsetTop = current.offset().top; //當前元素離頂部的高度
	    // 計算高度差
	    // 當元素進入視窗時，加入class

	    //視差調整
	    if (scrolled + $("#header").innerHeight() > offsetTop && scrolled < (offsetTop + $(this).innerHeight() - $("#header").innerHeight() - menu.innerHeight() ) ) {
			menu.addClass("fixed");
			menu.css("top",$("#header").innerHeight());
	    } else {
			menu.removeClass("fixed");
			menu.css("top",originalHeight);
	    }
	});


	//to active the right menu in mobile

	$(".section").each(function(){
		var current = $(this), // 當前元素
	    w_height = $(window).outerHeight(), //視窗高度
	    offsetTop = current.offset().top; //當前元素離頂部的高度

		if(scrolled == offsetTop){
			var sec = current.attr("data-anchor");
			console.log(sec);
			$(".menu-items-mobile ul li").removeClass("active");
			$(".menu-items-mobile ul li[data-menuahcnor='"+sec+"']").addClass("active");
		}

	});


}
function moveTo(section,slide){
	console.log("move to "+section);

	if(slide !== null){
		moveDown(section);
		moveRight(section,slide);
	}else{
		moveDown(section);
	}
	
}

function moveRight(section,slide){
	
	if(section == 'competition'){
		$("#competition_mobile_menu li a").removeClass("selected");
	$("#competition_mobile_menu li:nth-child("+(Number(slide)+1)+") a").addClass("selected");
		slide ="translateX("+((Number(slide)) * -25)+"%"+")";	
	}else{
		slide ="translateX("+((Number(slide)) * -33)+"%"+")";	
	}
	
	console.log(slide);
	console.log("moveRight");
	// $("#sec_"+section+" .fp-slidesContainer").animate({
	// 	duration : 1000,
	// 	step : function(){
			$("#sec_"+section+" .fp-slidesContainer").css("transform",slide);
	// 	},
	// 	queue:false,
	// 	easing:'easeInOutCubic' 
	// });
}

function moveDown(section){
	console.log("moveDown");
	var offset = $("#sec_"+section).offset();
	offset = offset.top-50;
	var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
	$body.animate({"scrollTop":offset},1000,'easeInOutCubic');
}



//********************MENU BURGER**********************

$('.menu-burger, .menu-items-mobile').on('click', function() {
	$('.menu-bg, .menu-items-mobile, .menu-burger').toggleClass('fs');
	$('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
});

// menu hamburger ends