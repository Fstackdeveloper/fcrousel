



(function ( $ ) {
 

			$.fn.fcarousel = function(options) {
				
		        // This is the easiest way to have default options.
		        var settings = $.extend({
		            // These are the defaults
		            height: "auto",
		            move: true
		        }, options );
                        
                        if(typeof $(this).data('move') !== "undefined")
                        {
                          settings.move =  $(this).data('move');
                        }
                        if(typeof $(this).data('height') !== "undefined")
                        {
                            settings.height =  $(this).data('height');
                        }
                        
                        
                        item_width_3 = $(this).innerWidth()/3 - 26;
                        item_width_2 = $(this).innerWidth()/2 - 26;
                        
				// Set warp width based on number and width or items
					var slides = $(this).find( ".fcarousel-item" );	
					var length = slides.length;
					var fullWidth =0 ;	
					var fthis = this;
					
					if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1100px)").matches) {
						 slides.css('width', item_width_2 + "px");
						}
                                        else if (window.matchMedia("(min-width: 1100px)").matches)
                                        {
                                                slides.css('width', item_width_3 + "px");
                                        }
					else 
						{
						 slides.css('width', "100vw");
						}
					
					
					if (slides.innerHeight() > 100 && settings.height == "auto")
					{
                              var innerHeight = 0, detailsInnerHeight=0;
                              slides.each(function (index) {
                                  if ($(this).innerHeight() > innerHeight)
                                     {
                                   innerHeight = $(this).innerHeight();
                                    detailsInnerHeight = $(this).find('.link-page-details').eq(0).innerHeight();
                                     }
                                    });
                                    
                               slides.each(function (index) {
                                       $(this).css('height', innerHeight +'px');
                                       $(this).find('.link-page-details').eq(0).css('height', detailsInnerHeight +'px');
                                    });
                               fthis.css('height', (innerHeight + 2) +'px');
					}
					else if (settings.height != "auto")
						{
						  fthis.css('height', settings.height);
						  slides.css('height', settings.height);
						}

					
					$( window ).resize( function () {
                                       item_width_3 = fthis.innerWidth()/3 - 26;
                                       item_width_2 = fthis.innerWidth()/2 - 26;
	
					if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1100px)").matches) {
						 slides.css('width', item_width_2 + "px");
						}
                                        else if (window.matchMedia("(min-width: 1100px)").matches)
                                        {
                                                slides.css('width', item_width_3 + "px");
                                        }
					else 
						{
						 slides.css('width', "100vw");
						}
						
						
						if (slides.innerHeight() > 100 && settings.height == "auto")
						{
                                var innerHeight = 0, detailsInnerHeight=0;
                              slides.each(function (index) {
                                  if ($(this).innerHeight() > innerHeight)
                                     {
                                   innerHeight = $(this).innerHeight();
                                   detailsInnerHeight = $(this).find('.link-page-details').eq(0).innerHeight();
                                     }
                                    });
                                    
                               slides.each(function (index) {
                                       $(this).css('height', innerHeight +'px');
                                       $(this).find('.link-page-details').eq(0).css('height', detailsInnerHeight +'px');
                                    });
                               fthis.css('height', (innerHeight + 2) +'px');
						}
						else if (settings.height != "auto")
							{
							  fthis.css('height', settings.height);
							  slides.css('height', settings.height);
							}
						
						fullWidth_resize = 0;
						slides.each(function( index ) {
							fullWidth_resize += $(this).outerWidth(true);
						});

						fthis.find( ".fcarousel-warp" ).width(fullWidth_resize + 20);


						
						
					});

					
					slides.each(function( index ) {
										fullWidth += $(this).outerWidth(true);
									});
		
					$(this).find( ".fcarousel-warp" ).width(fullWidth + 20);
				
				
				
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
						 
						 if(settings.move) { clearInterval(autoMove); }
					
					var length = fthis.find(".fcarousel-item" ).length;
					var target_item = length-1;
					WaitAnimation = true;
					var vleft = fthis.find( ".fcarousel-item" ).eq(target_item).outerWidth();
					fthis.find(".fcarousel-warp" ).prepend(fthis.find( ".fcarousel-item" ).eq(target_item)).css('left',-vleft).animate({left:0},500,function(){WaitAnimation = false;
					
					 if(settings.move) { autoMove = setInterval(function (){next(fthis)}, 4000); }
					 
					});
					
							
						}

				 };
				
				var prev = function (fthis)
				{
					if (!WaitAnimation)
						{
						
				    if(settings.move) { clearInterval(autoMove); }
					
					var target_item = 0;
					WaitAnimation = true;
					var vleft = fthis.find( ".fcarousel-item" ).eq(target_item).outerWidth();
					fthis.find(".fcarousel-warp" ).animate({left:-vleft},500,function(){
					WaitAnimation = false; 
					$(this).css('left',0); 
					$(this).append(fthis.find( ".fcarousel-item" ).eq(target_item));
					
					 if(settings.move) { autoMove = setInterval(function (){prev(fthis)}, 4000);}
					 
					
					});	
					
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
				
				
					
				    if(settings.move) {  var autoMove = setInterval(function (){next(fthis)}, 4000); }

			
			return this;
			};
 
		}( jQuery ));
		
		
		
		
		
