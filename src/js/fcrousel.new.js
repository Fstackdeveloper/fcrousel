
import {uniqId, openNewTab, vimeoID, youtubeID, extractHostname, extractRootDomain} from './fcrousel.functions.js';
import {sizing} from './fcrousel.sizing.js';
import {pagination} from './fcrousel.pagination.js';
import {design} from './fcrousel.design.js';
import {setting} from './fcrousel.setting.js';
import {items} from './fcrousel.items.js';
import {imageCrop} from './items/fcrousel.image.crop.js';
import {image} from './items/fcrousel.image.js';
import {videoLink} from './items/fcrousel.video.link.js';

(function ( $ ) {

$.fn.fcarouselNew = function() { 
    
 //Generate Unique ID for fcrousel
 var fID = uniqId();   
 
 var fcrousel = $(this);
 fcrousel.settings = new setting($(this).data()).get();
 fcrousel.items =  (new items(fcrousel)).get();
 var settings =  fcrousel.settings; 
 var paginate = new pagination(fcrousel,settings.move );
 var size = new sizing(fcrousel);
 var fdesign = new design(fcrousel);
 fdesign.buttonsWithWarpper();

    


 fcrousel.items.forEach(function(item) {
    if (item.type === 'image' && !item.imgcrop)
    { 
        new image(item, fcrousel);
    }
    else  if (item.type === 'image' && item.imgcrop)
    {
        new imageCrop(item, fcrousel);
    }
    else if(item.type === 'video-link' )
    {
         new videoLink(item, fcrousel);
    }
    
});

         


/*
     
       //Items 
        $(this).find("[data-item]").each(function (index) {
            
            //Image Type
            if ($(this).prop("tagName") === 'IMG' &&  settings.imgcrop === false )
            { 
                var url = $(this).data('full_image');
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
                var url = $(this).data('full_image');
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
        
 

*/

    paginate.click();
    paginate.swipe();

        
				
				
        
        
        //Resize Fcrousel
        size.width();
        $( window ).resize( function () { size.width(); });
        
        //Border Radius Fcrousel Items
        $(this).find(".fcarousel-item").css('border-radius', settings.radius);
        

    
    };
    
    
$("[data-fcrousel]").each(function () { $(this).fcarouselNew(); });   
}( jQuery ));