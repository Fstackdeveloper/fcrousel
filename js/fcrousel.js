



(function ( $ ) {
 

			$.fn.fcarousel = function() {
				
				// Set warp width based on number and width or items
					var slides = $(this).find( ".fcarousel-item" );	
					var length = slides.length;
					var fullWidth =0 ;	
					slides.each(function( index ) {
										fullWidth += $(this).outerWidth(true);
									});
		
					$(this).find( ".fcarousel-warp" ).width(fullWidth);
				
				
				
				// Prev And Nex Buttons Style

					$(this).find(".fcarousel-control-next").each(function(index)
										 {
											$(this).css('top', '50%').css('top', '-='+($(this).outerHeight()/2));
										 }
										 );
	  				$(this).find(".fcarousel-control-prev").each(function(index)
										 {
		  									$(this).css('top', '50%').css('top', '-='+($(this).outerHeight()/2));
										 }
										 );
					
				
				 var WaitAnimation = false;
				 var next = function (fthis)
				 {
					 
					 if (!WaitAnimation)
						{
					clearInterval(autoMove);
					var length = fthis.find(".fcarousel-item" ).length;
					var target_item = length-1;
					WaitAnimation = true;
					var vleft = fthis.find( ".fcarousel-item" ).eq(target_item).outerWidth();
					fthis.find(".fcarousel-warp" ).prepend(fthis.find( ".fcarousel-item" ).eq(target_item)).css('left',-vleft).animate({left:0},500,function(){WaitAnimation = false;autoMove = setInterval(function (){next(fthis)}, 4000);});
							
						}

				 };
				
				var prev = function (fthis)
				{
					if (!WaitAnimation)
						{
					clearInterval(autoMove);
					var target_item = 0;
					WaitAnimation = true;
					var vleft = fthis.find( ".fcarousel-item" ).eq(target_item).outerWidth();
					fthis.find(".fcarousel-warp" ).animate({left:-vleft},500,function(){WaitAnimation = false; $(this).css('left',0); $(this).append(fthis.find( ".fcarousel-item" ).eq(target_item));autoMove = setInterval(function (){prev(fthis)}, 4000);});			
						}

					
				};
				
				
				// On Click Events (Next Prev)
				$(this).find( ".fcarousel-control-prev" ).on('click', { fthis : this }, function(e)
							{
								prev(e.data.fthis);
	
							}
							);

				
		
					$(this).find( ".fcarousel-control-next" ).on('click', { fthis : this }, function(e)
							{
					
						
								next(e.data.fthis);

							}
							);
				
				
				//On Swipe Events (for Mobile)
					var fthis = this;
				   Hammer(this[ 0 ]).on("swipeleft", function(e)
											   {
					   								prev(fthis);   
				   							   }
												);
			
				    Hammer(this[ 0 ]).on("swiperight", function(e) 
											    {
													next(fthis);
												}
											  );
				
				
					
					var autoMove = setInterval(function (){next(fthis)}, 4000);

			
			return this;
			};
 
		}( jQuery ));
		
		
		
		
		