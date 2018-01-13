import {uniqId, vimeoID, youtubeID, extractRootDomain} from './fcrousel.functions.js';
export class items {
    
    fcarousel = null;
    fitems = [];
    
    constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
           this.fcarouselItems();
        }
        
     
     
     fcrouselType(item)
     {
            let type;
            if (item.domain === "youtube.com" || item.domain === "youtu.be" || item.domain === "vimeo.com"  )
              {
               type = item.type || "video-link";
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
        
     fcarouselItems()
     {
         let rootThis = this;
         this.fcarousel.find("[data-item]").each(function (index) {
            var item = {};
            item = $.extend(item, rootThis.fcarousel.settings);
            item = $.extend(item, $(this).data());
            item.id = rootThis.fcarousel.settings.id + "-" +  uniqId();
            item.fid  = rootThis.fcarousel.settings.id;

            //Image Type
            if ($(this).prop("tagName") === 'IMG')
            {
               item.type = "image";
               item.image =  $(this).attr('src') || item.image ;
            }
            else if ($(this).prop("tagName") === 'DIV')
            {
                item.image = $(this).find("[data-image]").eq(0).attr('src') || rootThis.fitems[index].image;
                item.link = $(this).find("[data-link]").eq(0).attr('href') || item.link;
                item.domain = extractRootDomain(item.link); 
                item.title = $(this).find("[data-title]").eq(0).text() || item.title;
                item.description =  $(this).find("[data-description]").eq(0).text() || item.description;
                item.link = rootThis.fcrouselLink(item);
                item.type = rootThis.fcrouselType(item);
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