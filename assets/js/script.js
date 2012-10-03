$( function()
  {
    //styleselector
    $( '#styleselector-toggle' ).bind( 'click', 
      function()
      {
        target = $( '#styleselector' );
        
        if( target.css( 'right' ) == '0px' )
        {
          target.animate( {
            right: '-175px'
          } );
        }
        else
        {
          target.animate( {
            right: '0px'
          } );
        }
      } );
      
    $( '#colors li' ).bind( 'click', 
      function()
      {
        $( '#colors li' ).removeClass( 'color-active' );
        $( this ).addClass( 'color-active' );
        
        color = $( this ).attr( 'id' );
        
        if( color == 'violet' )
        {
          $( '#styleselector_css' ).attr( 'href', '' );
        } else {
          $( '#styleselector_css' ).attr('href', 'assets/css/' + color + '.css');
        }
      } );
  
    //parallax
    $( window ).scroll( function()
    {
      $( '#parallax1' ).css( 'background-position', '0 -' + $( window ).scrollTop() * 0.5 + 'px' );
      $( '#parallax2' ).css( 'background-position',  '0 -' + $( window ).scrollTop() * 0.2 + 'px' );
    } )
    
    
   
   
    
    // topnav click event
    $( 'ul.nav a, .custom-nav' ).bind( 'click',
      function( event )
      {
        var that = $( this );

        $( '[data-spy="scroll"]' ).each( 
          function()
          {
            var spy = $( this ).scrollspy( 'refresh' )
          } );
        
        var offset = 0;
        
        // if window width is smaller than 979px, don't add offset
        if( $( window ).width() < 979 )
        {
          offset = 0;
        }

        $( 'html, body' ).stop().animate(
        {
          scrollTop: $( that.attr( 'href' ) ).offset().top - offset
        },
        1000,
        'easeInOutExpo'
        );

        event.preventDefault();
      } );
  } );
  
  
  $(document).ready(function(e) {
    $('.promo-social a i').mouseenter(function(e) {
        $(this).stop().transition({ scale: 1.4 });
    });
	
    $('.promo-social a i').mouseleave(function(e) {
        $('.promo-social a i').stop().transition({ scale: 1 });
    });
	
	
	$('.inner-social a i').mouseenter(function(e) {
        $(this).stop().transition({ scale: 1.2 });
    });
	
    $('.inner-social a i').mouseleave(function(e) {
        $('.inner-social a i').stop().transition({ scale: 1 });
    });
	
	
	$('.about-thumb').mouseenter(function(e) {
        $(this).stop().transition({ scale: 1.2 });
    });
	
    $('.about-thumb').mouseleave(function(e) {
        $('.about-thumb').stop().transition({ scale: 1 });
    });
	
	$('.best-value').stop().transition({ scale: 1.1 });
});
  

