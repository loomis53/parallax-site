$(document).ready(function(){

	// Blur images on mouse over
	$(".works a").hover( function(){ 
		$(this).children("img").animate({ opacity: 0.75 }, "fast"); 
	}, function(){ 
		$(this).children("img").animate({ opacity: 1.0 }, "slow"); 
	}); 
	
	//works Mouse Effects
	$('.item').mouseenter(function(e) {
		$(this).find('.overlay-block').fadeIn(1000,'swing');
		
	});
	
	$('.item').mouseleave(function(e) {
		$('.item').find('.overlay-block').fadeOut(100);
	});

	// Clone works items to get a second collection for Quicksand plugin
	var $portfolioClone = $(".works ").clone();
	
	// Attempt to call Quicksand on every click event handler
	$(".filter a").click(function(e){
		
		$(".filter li").removeClass("current");	
		
		// Get the class attribute value of the clicked link
		var $filterClass = $(this).parent().attr("class");

		if ( $filterClass == "all" ) {
			var $filteredworks = $portfolioClone.find("li");
		} else {
			var $filteredworks = $portfolioClone.find("li[data-type~=" + $filterClass + "]");
		}
		
		// Call quicksand
		$(".works ").quicksand( $filteredworks , { 
			duration: 800, 
			easing: 'easeInOutQuad' 
		}, function(){
			
			// Blur newly cloned works items on mouse over and apply prettyPhoto
			$(".works a").hover( function(){ 
				$(this).children("img").animate({ opacity: 0.75 }, "fast"); 
			}, function(){ 
				$(this).children("img").animate({ opacity: 1.0 }, "slow"); 
			}); 
			
			//works Mouse Effects
	$('.item').mouseenter(function(e) {
		$(this).find('.overlay-block').fadeIn(1000,'swing');
		
	});
	
	$('.item').mouseleave(function(e) {
		$('.item').find('.overlay-block').fadeOut(100);
	});
		});


		$(this).parent().addClass("current");

		// Prevent the browser jump to the link anchor
		e.preventDefault();
	})
});