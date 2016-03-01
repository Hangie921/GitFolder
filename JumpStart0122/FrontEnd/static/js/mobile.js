//Mobile js except the Fullpage.js



//==========================MOBILE COMPETITION SLIDE MENU==========


function revealOnScroll() {
	var menu = $("#competition_mobile_menu_container");
	var originalHeight = $("#sec_home").innerHeight() + $("#sec_about").innerHeight();
	
	var scrolled = $(window).scrollTop();
	menu.css("top",originalHeight);

	console.log(scrolled);
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
		    console.log("add fixed");
	    } else {
			menu.removeClass("fixed");
			menu.css("top",originalHeight);
		    console.log("remove fixed");
	    }
	});
}




//********************MENU BURGER**********************

$('.menu-burger, .menu-items-mobile').on('click', function() {
	$('.menu-bg, .menu-items-mobile, .menu-burger').toggleClass('fs');
	$('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
});

// menu hamburger ends