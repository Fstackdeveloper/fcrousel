/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

export class design {
    
    fcarousel = null;
    
    constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
           this.fcrousel();
        }

   fcrousel()
   {
        // Add Main CSS Class
        if(!this.fcarousel.hasClass("fcarousel")){
                 this.fcarousel.addClass("fcarousel");
            }
        //Set ID for fcrousel
        this.fcarousel.attr('id',this.fcarousel.settings.id);
        this.container();
   }
   
   
   //Main Warppers
   container()
       {
             // Add Inner Warp
            var InnerWarp = "<div class='fcarousel-inner'></div>";

            // Add Outer Warp
            var OuterWarp = "<div class='fcarousel-outer'>"+InnerWarp+"</div>";

            this.fcarousel.append(OuterWarp);
       }
       
       
   //Buttons For Next Prev Pagination 
   buttonsWithWarpper()
   {        
            let  paginationPrev = `<div class='fcarousel-control-prev-wrapper'>
                                   <a class='fcarousel-control-prev' href='javascript:' role='button' data-slide='prev'>
                                   <i class='fa fa-chevron-left fa-lg'></i>
                                   <span class='sr-only'>Previous</span>
                                   </a>
                                   </div>`;
                 this.fcarousel.append(paginationPrev);


            var  paginationNext = `<div class='fcarousel-control-next-wrapper'>
                                   <a class='fcarousel-control-next' href='javascript:' role='button' data-slide='next'>
                                   <i class='fa fa-chevron-right fa-lg'></i>
                                   <span class='sr-only'>Next</span>
                                   </a>
                                   </div>`;
                this.fcarousel.append(paginationNext);
   }
   
   
   
   imageNoCrop()
   {
       
   }
   
   
   
   
   
    
}

