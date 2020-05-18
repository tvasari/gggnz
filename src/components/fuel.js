$(document).ready(function(){

	/* SHOWCASE */
	if( $('#showcase').length ) {
	
			$inner = $('#showcase div.inner');

			rowspace = 300;
			colspace = 300;
			max_rows = 8;
			max_cols = 12;

			function updateThumbs() {
			
				for ( row = 0; row < max_rows; row++ ) {
					var $t = $('div.r'+row+':first');
					if($t.length) {
						if( $t.offset().top < -600 ) $('div.r'+row).css({ top: parseInt( $t.css('top') ) + max_rows * rowspace });
						else if( $t.offset().top > $(window).height() + 600 ) $('div.r'+row).css({ top: parseInt( $t.css('top') ) - max_rows * rowspace });
					}
				}
				for ( col = 0; col < max_cols; col++ ) {
					var $t = $('div.c'+col+':first');
					if($t.length) {
						
						if( $t.offset().left < -1200 ) $('div.c'+col).css({ left: parseInt( $t.css('left') ) + max_cols * colspace });
						else if( $t.offset().left > $(window).width() + 900 ) $('div.c'+col).css({ left: parseInt( $t.css('left') ) - max_cols * colspace });
					}
				}
			}
	
			$inner.draggable({stop: function() { updateThumbs(); }});
			$(window).resize(updateThumbs);
	
	}
});

// https://stackoverflow.com/questions/43638938/updating-an-object-with-setstate-in-react