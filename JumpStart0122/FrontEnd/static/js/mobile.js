//Mobile js except the Fullpage.js



//==========================mobile competition slide menu ani


function revealOnScroll() {
	var menu = $("#competition_mobile_menu_container");
	var originalHeight = $("#sec_home").height() + $("#sec_about").height() + 70;
	console.log(originalHeight);
	var scrolled = $(window).scrollTop();
	menu.css("top",originalHeight);

	console.log(scrolled);
	$('#sec_competition').each(function() {
		var current = $(this), // 當前元素
	    w_height = $(window).outerHeight(), //視窗高度
	    offsetTop = current.offset().top; //當前元素離頂部的高度
	    // console.log("window height:"+w_height);
	    console.log('offset:'+offsetTop);
	    // 計算高度差
	    // 當元素進入視窗時，加入class
	    if (scrolled + 50 > offsetTop) {
			menu.addClass("fixed");
			menu.css("top",$("#header").height());
		    console.log("add fixed");
	    } else {
			menu.removeClass("fixed");
			menu.css("top",originalHeight);
		    console.log("remove fixed");
	    }
	});
}
	





//menu hamburger

$('.menu-burger, .menu-items-mobile').on('click', function() {
	$('.menu-bg, .menu-items-mobile, .menu-burger').toggleClass('fs');
	$('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
});

// menu hamburger ends