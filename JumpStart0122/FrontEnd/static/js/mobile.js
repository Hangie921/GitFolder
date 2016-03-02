//Mobile js except the Fullpage.js



//==========================MOBILE COMPETITION SLIDE MENU==========


function revealOnScroll(){
	var offset = $("#sec_competition").offset();
	var menu = $("#competition_mobile_menu_container");
	var originalHeight = $("#sec_home").innerHeight() + $("#sec_about").innerHeight();
	var scrolled = $(window).scrollTop();
	console.log("window:"+scrolled);
	console.log("#competition:"+offset.top);
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
}
function moveTo(section,slide){
	console.log("move to "+section);

	if(typeof slide !== null){
		moveDown(section);
		moveRight(section,slide);
	}else{
		moveDown(section);
	}
	
}

function moveRight(section,slide){
	slide = ((Number(slide)) * -100)+"%";
	console.log("moveRight");
	$("#sec_"+section+" .fp-slideContainer").css("left",slide);
	// $(window).scrollLeft(offset.left);
}

function moveDown(section){
	console.log("moveDown");
	var offset = $("#sec_"+section).offset();
	if(section === 'competition'){
		$(window).scrollTop(offset.top-50);
	}else{
		$(window).scrollTop(offset.top-50);
	}
}



//********************MENU BURGER**********************

$('.menu-burger, .menu-items-mobile').on('click', function() {
	$('.menu-bg, .menu-items-mobile, .menu-burger').toggleClass('fs');
	$('.menu-burger').text() == "☰" ? $('.menu-burger').text('✕') : $('.menu-burger').text('☰');
});

// menu hamburger ends