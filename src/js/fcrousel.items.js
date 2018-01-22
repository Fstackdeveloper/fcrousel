/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {uniqId, vimeoID, youtubeID, extractRootDomain, extension} from './fcrousel.functions.js';
export class items {
    
    fcarousel = null;
    fitems = [];
    
    constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
           this.fcarouselItems();
        }
        
     
     
     itemType(item)
     {
         if(item.type)
         {
             return item.type;
         }
         
        let type;
        if (item.domain === "youtube.com" || item.domain === "youtu.be" || item.domain === "vimeo.com"  )
          {
           type = item.type || "embed-video";
          }
         else if ($.inArray(item.extension, ['mp4','webm','ogv','ogg']) !== -1)
         {
           type = item.type || "video";
         }
         else
         {
           type = item.type || "link";
         }
          return type;

         
     }
    
     fcrouselLink(item)
     {  
            let link;
            if (item.domain === "youtube.com" || item.domain === "youtu.be" )
              {
                 link =  "https://www.youtube.com/embed/"+youtubeID(item.link);    
              }
            else if (item.domain === "vimeo.com" )
              {
                 link = "https://vimeo.com/"+vimeoID(item.link);
              } 
             else
             {
                 link = item.link;
             }
              
              return link;
    }
    
    
    
    image(itemElm)
    {
      let item = {};
      item.image =  itemElm.attr('src');
      
      return item;
    }
    
    divData(itemElm)
    {
        let item = {};
        
            //For Links, Video, Embed Video
            item.image = itemElm.find("[data-image]")?itemElm.find("[data-image]").eq(0).attr('src'):null;
            item.link = itemElm.find("[data-link]")?itemElm.find("[data-link]").eq(0).attr('href'):null;
            item.domain = item.link?extractRootDomain(item.link):null; 
            item.extension = item.link?extension(item.link):null; 
            item.title = itemElm.find("[data-title]")?itemElm.find("[data-title]").eq(0).text():null;
            item.description =  itemElm.find("[data-description]")?itemElm.find("[data-description]").eq(0).text():null;
            item.link = this.fcrouselLink(item);


            //For Offers
            item.price = itemElm.find("[data-price]")?itemElm.find("[data-price]").eq(0).text():null;
            item.price_before = itemElm.find("[data-price_before]")?itemElm.find("[data-price_before]").eq(0).text():null;
            item.offer_end = itemElm.find("[data-offer_end]")?itemElm.find("[data-offer_end]").eq(0).text():null;
            
            
            //HTML
            item.html = itemElm.html();
        
        return item;
    }
        
    
    div(itemElm)
    {
        var item = {};
        var getItem = {};
        getItem = $.extend(getItem, this.divData(itemElm));
        for(var key in getItem){
            if(getItem[key])
            {
                item[key] = getItem[key];
            }   
        }

        return item;
    }
        
        
     fcarouselItems()
     {
         let rootThis = this;
         this.fcarousel.find("[data-item]").each(function (index) {
            var item = {};
            item = $.extend(item, rootThis.fcarousel.settings);
            item = $.extend(item, $(this).data());
            item.id = rootThis.fcarousel.settings.id + "-" +  uniqId();
            item.fid  = rootThis.fcarousel.settings.id;
            item.order = index;
            
            //Image Type
            if ($(this).prop("tagName") === 'IMG')
            {
               item.type = "image";
               item = $.extend(item, rootThis.image($(this)));
               
            }
            else if ($(this).prop("tagName") === 'DIV')
            {
                item = $.extend(item, rootThis.div($(this)));
                item.type = rootThis.itemType(item);
            }
            $(this).remove();
            rootThis.fitems.push(item);
         });
     }
     
     
     
     get()
     {
         return this.fitems;
     }


}