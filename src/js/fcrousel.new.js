
import {uniqId, openNewTab, vimeoID, youtubeID, extractHostname, extractRootDomain} from './fcrousel.functions.js';
import {sizing} from './fcrousel.sizing.js';

(function ( $ ) {

$.fn.fcarouselNew = function() { 
    // This is the easiest way to have default options.
    var settings = $.extend({
    // These are the defaults
    imgHeight: "auto",
    imgRatio: "1:1",
    imgcrop: false,
    radius: '0',
    move: false
    }, $(this).data() );
    
    
 //Generate Unique ID for fcrousel
 var fID = uniqId();   
 //Set ID for fcrousel
 $(this).attr('id',fID);
 var fthis = $(this);

    
    settings.imgRatio = settings.imgRatio.split(":");
    
        // Add Main CSS Class
        if(!$(this).hasClass("fcarousel")){
                 $(this).addClass("fcarousel");
            }
        
        
        // Add Inner Warp
        var InnerWarp = "<div class='fcarousel-inner'></div>";
        
        // Add Outer Warp
        var OuterWarp = "<div class='fcarousel-outer'>"+InnerWarp+"</div>";
        
        $(this).append(OuterWarp);
        
        
        
        //Pagination
        
        //Previous
        
    var  paginationPrev = ` 
        <div class='fcarousel-control-prev-wrapper'>
        <a class='fcarousel-control-prev' href='javascript:' role='button' data-slide='prev'>
            <i class='fa fa-chevron-left fa-lg'></i>
            <span class='sr-only'>Previous</span>
        </a>
        </div>            
         `;
 $(this).append(paginationPrev);


    var  paginationNext = ` 
        <div class='fcarousel-control-next-wrapper'>
        <a class='fcarousel-control-next' href='javascript:' role='button' data-slide='next'>
            <i class='fa fa-chevron-right fa-lg'></i>
            <span class='sr-only'>Next</span>
        </a>
        </div>            
         `;
 $(this).append(paginationNext);
 
 
 



     
       //Items 
        $(this).find("[data-item]").each(function (index) {
            
            //Image Type
            if ($(this).prop("tagName") === 'IMG' &&  settings.imgcrop === false )
            { 
                var url = $(this).data('full');
                var a = (url) ? "<a rel='fancybox_img_" + fID +"'  href='" + url + "' ></a>" : "";
                var img = "<img class='fcarousel-photo' src='"+ $(this).attr('src') +"'>";
                var item = "<div class='fcarousel-item fcarousel-photo-warp' > "+ a + img +" </div>";
                $(item).appendTo( $(this).parent().find(".fcarousel-inner") ).on('click', function (e) { 
                    e.preventDefault();
                    if ($(this).find('a').length !== 0)
                    {
                    $.fancybox.open( $('a[rel=fancybox_img_' + fID + ']'),{
                            type: 'image',  
                            href: url,
                            index: $( 'a[rel=fancybox_img_' + fID + ']' ).index( $(this).find('a').eq(0) ) 
                    });
                     }       
                });
                $(this).remove();
            }      
            else if ($(this).prop("tagName") === 'IMG' &&  settings.imgcrop === true)
            {
                var url = $(this).data('full');
                var a = (url) ? "<a rel='fancybox_img_" + fID +"'  href='" + url + "' ></a>" : "";
                var item = "<div class='fcarousel-item fcarousel-photo-crop' style='background:url("+ $(this).attr('src') +");background-size: cover;'>"+ a +"</div>";
                $(item).appendTo( $(this).parent().find(".fcarousel-inner") ).on('click', function (e) { 
                    e.preventDefault();
                    if ($(this).find('a').length !== 0)
                    {
                    $.fancybox.open( $('a[rel=fancybox_img_' + fID + ']'),{
                            type: 'image',    
                            href: url,
                            index: $( 'a[rel=fancybox_img_' + fID + ']' ).index( $(this).find('a').eq(0) ) 
                    });
                    }
                });
                $(this).remove();                
            }
            // Link Type
            else if ($(this).prop("tagName") === 'DIV' &&  $(this).data('type') === 'link')
            {
                var url = $(this).find('a').eq(0).attr('href');
                var domain = extractRootDomain(url);
                url = (domain === "youtube.com" || domain === "youtu.be" )? "https://www.youtube.com/embed/"+youtubeID(url) : url;
                url = (domain === "vimeo.com" )? "https://vimeo.com/"+vimeoID(url) : url;
                var a = (domain === "youtube.com" || domain === "youtu.be" || domain === "vimeo.com") ? "<a rel='fancybox_link_" + fID +"'  href='" + url + "' ></a>" :'';
                var img = "<div class='fcarousel-link-photo' style='background:url("+ $(this).find('img').eq(0).attr('src') +");background-size: cover;'> </div>";
                var title = "<div class='fcarousel-link-title'>" + $(this).find('a').eq(0).text() + " </div>";
                var desc = "<div class='fcarousel-link-desc'> " + $(this).find('span').eq(0).text() + " </div>";
                var displayURL = "<div class='fcarousel-link-display-url'> "+ domain +" </div>";
                var details = "<div class='fcarousel-link-details'> "+ title + desc + a  +" </div>";
                var item = "<div class='fcarousel-item fcarousel-link'> "+ img + details + displayURL +" </div>";
                
                $(item).appendTo( $(this).parent().find(".fcarousel-inner") ).on('click', function (e) { 
                    if (domain === "youtube.com" || domain === "youtu.be" || domain === "vimeo.com"  )
                    {
                        e.preventDefault();                       
                        $.fancybox.open( $('a[rel=fancybox_link_' + fID + ']'),{
                              type: 'iframe',
                              href: url,
                              index: $( 'a[rel=fancybox_link_' + fID + ']' ).index( $(this).find('a').eq(0) ) 
                        });
                      
                      
                    }
                    else
                    {
                        openNewTab(url); 
                    }       
                
                });
                //$(this).parent().find(".fcarousel-inner").append(item);
                $(this).remove();                
            }
            
        });
        
 




// Pagination Function
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
		fthis.find(".fcarousel-inner" ).prepend(fthis.find( ".fcarousel-item" ).eq(target_item)).css('left',-vleft).animate({left:0},500,function(){WaitAnimation = false;					
		if(settings.move) { autoMove = setInterval(function (){next(fthis);}, 4000); }
	});}};
				
    var prev = function (fthis)
	{
            if (!WaitAnimation)
		{
		if(settings.move) { clearInterval(autoMove); }
		var target_item = 0;
                WaitAnimation = true;
		var vleft = fthis.find( ".fcarousel-item" ).eq(target_item).outerWidth();
		fthis.find(".fcarousel-inner" ).animate({left:-vleft},500,function(){
		WaitAnimation = false; 
		$(this).css('left',0); 
		$(this).append(fthis.find( ".fcarousel-item" ).eq(target_item));
		if(settings.move) { autoMove = setInterval(function (){prev(fthis);}, 4000);}
	});}};


        // On Click Events (Next Prev)
	$(this).find( ".fcarousel-control-prev" ).on('click', { fthis : $(this) }, function(e)
            {
		prev(e.data.fthis);
            });

	$(this).find( ".fcarousel-control-next" ).on('click', { fthis : $(this) }, function(e)
            {
                next(e.data.fthis);
            });

        
        
      	//On Swipe Events (for Mobile)
	Hammer(this[ 0 ]).on("swipeleft", function(e)
            {
		prev(fthis);   
	    });		
	
        Hammer(this[ 0 ]).on("swiperight", function(e) 
            {
		next(fthis);
            });
				
				
	//Auto Move				
	if(settings.move) {  var autoMove = setInterval(function (){next(fthis);}, 4000); }
        
        
        //Resize Fcrousel
        sizing($(this));
        $( window ).resize( function () { sizing(fthis); });
        
        //Border Radius Fcrousel Items
        $(this).find(".fcarousel-item").css('border-radius', settings.radius);
        

    
    };
    
    
$("[data-fcrousel]").each(function () { $(this).fcarouselNew(); });   
}( jQuery ));