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

         
         

    paginate.click();
    paginate.swipe();

        
				
				
        
        
        //Resize Fcrousel
        size.resize();
        $( window ).resize( function () { size.resize(); });
        
        //Border Radius Fcrousel Items
        $(this).find(".fcarousel-item").css('border-radius', fcrousel.settings.radius);
        

    
    };
    
    
$("[data-fcrousel]").each(function () { $(this).fcarouselNew(); });   
}( jQuery ));