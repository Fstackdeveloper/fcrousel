/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {uniqId, openNewTab, vimeoID, youtubeID, extractHostname, extractRootDomain} from './fcrousel.functions.js';
import {sizing} from './fcrousel.sizing.js';
import {pagination} from './fcrousel.pagination.js';
import {design} from './fcrousel.design.js';
import {setting} from './fcrousel.setting.js';
import {items} from './fcrousel.items.js';
import {image} from './items/fcrousel.image.js';
import {videoLink} from './items/fcrousel.video.link.js';
import {video} from './items/fcrousel.video.js';
import {link} from './items/fcrousel.link.js';
import {product} from './items/fcrousel.product.js';
import {service} from './items/fcrousel.service.js';
import {offer} from './items/fcrousel.offer.js';
import {drag} from './fcrousel.drag.js';



(function ( $ ) {

$.fn.fcarouselNew = function() { 
    
    
 var fcrousel = $(this);
 fcrousel.settings = new setting($(this).data()).get();
 fcrousel.items =  (new items(fcrousel)).get();
 var paginate = new pagination(fcrousel);
 var size = new sizing(fcrousel);
 var fdesign = new design(fcrousel);
 fdesign.buttonsWithWarpper();

    



 fcrousel.items.forEach(function(item) {
    if (item.type === 'image')
    { 
        new image(item, fcrousel);
    }
    else if(item.type === 'link' )
    {
         new link(item, fcrousel);
    }
    else if(item.type === 'video-link' )
    {
         new videoLink(item, fcrousel);
    }
    else if(item.type === 'video' )
    {
         new video(item, fcrousel);
    }
    else if(item.type === 'product' )
    {
         new product(item, fcrousel);
    }
    else if(item.type === 'offer' )
    {
         new offer(item, fcrousel);
    }

    
});


       /*  
           fcrousel.find( ".fcarousel-item" ).on("mousedown", function(e) 
            {
               e.stopPropagation();
               if(e.which === 1) 
               {
                let inner = fcrousel.find(".fcarousel-inner" ).eq(0);
                let itemsPerPage = fcrousel['itemsPerPage'];
                let itemsPerPageWidth = inner.find( ".fcarousel-item" ).eq(0).outerWidth() * itemsPerPage;
                let leftElm =Number(inner.css("left").replace('px', ''));
                let leftFirst = e.clientX;   
                let elmWidth = inner.find( ".fcarousel-item" ).eq(0).outerWidth();    
                let leftSecond = e.clientX;

                let length = fcrousel.find(".fcarousel-item" ).length;
                
                for(let i = (length-1); i >= (length - itemsPerPage); i--)
                {
                    let cloned = inner.find( ".fcarousel-item" ).eq(length-1).clone(true);
                    cloned.addClass('fcarousel-item-copy');
                    inner.prepend(cloned);
                }
                
                
                for(let i = itemsPerPage; i < 2*itemsPerPage; i++)
                {
                   let cloned = inner.find( ".fcarousel-item" ).eq(i).clone(true);
                   cloned.addClass('fcarousel-item-copy');
                   inner.append(cloned);
                }
                

                let NextWarpWidth = fcrousel.find('.fcarousel-control-next-wrapper').eq(0).outerWidth();
                let ItemMarginLeft =   Number(fcrousel.find('.fcarousel-item').css("marginLeft").replace('px', ''));
                let ItemMarginRight =   Number(fcrousel.find('.fcarousel-item').css("marginRight").replace('px', ''));            
                leftElm = leftElm - itemsPerPageWidth -  NextWarpWidth + ItemMarginLeft + ItemMarginRight;
                
                inner.css('left', leftElm);
                
                inner.css('width',((2*itemsPerPageWidth) + inner.width()));


                $(this).on("mouseup", function(e) {
                   
                    e.stopPropagation();
                    let x = (leftSecond - leftFirst) + (leftElm +  itemsPerPageWidth);     
                    let elmNo = Math.round(x/elmWidth);
                    
                    
                                  
                    inner.find('.fcarousel-item-copy').remove();
                    
                    
                    let SecondCopy = fcrousel;
                    
                    if(x > 0)
                    {
                        var length = SecondCopy.find(".fcarousel-item" ).length;
                        for(let i = length; i > (length - elmNo); i--)
                        {
                          inner.prepend(inner.find( ".fcarousel-item" ).eq(length-1));
                        }
                    }
                    else
                    {
                        
                        for(let i = 0; i < (elmNo * -1); i++)
                        {
                            
                           inner.append(inner.find( ".fcarousel-item" ).eq(0));
                        }

                    }
                    
                      inner.css('left',0); 
                      $(this).off("mousemove");
                      $(this).off("mouseup");
                      
                      return false;
                  });  
                  
		 $(this).on("mousemove", function(e) {
                    if(e.which === 1) 
                    {
                    e.stopPropagation();

                    leftSecond = e.clientX;  
                    
                    let x = (leftSecond - leftFirst) + leftElm;     
                    
                     inner.css('left',x);    
                  
                  }
                  else
                  {
                      $(this).trigger( "mouseup" );
                  } 
                    
                });
                
                 $(this).on("mouseleave",function(e) { $(this).trigger( "mouseup" );});
            }
            });
            
 
     
      jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchstart", handle, { passive: false });
        } else {
            this.addEventListener("touchstart", handle, { passive: true });
        }
    }
};


 jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchmove", handle, { passive: false });
        } else {
            this.addEventListener("touchmove", handle, { passive: true });
        }
    }
};



      jQuery.event.special.touchend = {
    setup: function( _, ns, handle ){
        if ( ns.includes("noPreventDefault") ) {
            this.addEventListener("touchend", handle, { passive: false });
        } else {
            this.addEventListener("touchend", handle, { passive: true });
        }
    }
};



           fcrousel.on("touchstart", function(e) 
            {
                let leftElm =Number($(this).find('.fcarousel-inner').eq(0).css("left").replace('px', ''));
                let leftFirst = e.originalEvent.changedTouches[0].clientX; 
                
                
		fcrousel.on("touchmove", function(e) {
                    e.stopPropagation();
                    let leftSecond = e.originalEvent.changedTouches[0].clientX;  
                    
                    let x = (leftSecond - leftFirst) + leftElm; 
                    
                  $(this).find(".fcarousel-inner" ).css('left',x);    
                 
                  $("body").on("touchend", function(e) {
                       e.stopPropagation();
                      fcrousel.off("touchmove");
                  });  
                    
                });
            });

     */
    
    paginate.click();
    paginate.swipe();

        
				
				
        
        
        //Resize Fcrousel
        size.resize();
        $( window ).resize( function (e) { e.preventDefault(); size.resize(); });
        
        
        new drag(fcrousel);
        
        
        //Border Radius Fcrousel Items
        $(this).find(".fcarousel-item").css('border-radius', fcrousel.settings.radius);
        

    
    };
    
    
$("[data-fcrousel]").each(function () { $(this).fcarouselNew(); });   
}( jQuery ));