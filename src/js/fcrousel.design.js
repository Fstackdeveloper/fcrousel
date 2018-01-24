/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {LightenDarkenColor} from './fcrousel.functions.js';

export class design {
    
    fcarousel = null;
    Color = null;
    
    constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
           this.Color = require('color');
           this.fcrousel();
        }

   fcrousel()
   {
       //Create Custom Style
       this.style();
       
        // Add Main CSS Class
        if(!this.fcarousel.hasClass("fcarousel")){
                 this.fcarousel.addClass("fcarousel");
                 this.fcarousel.addClass("custom_"+this.fcarousel.settings.id);
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
                                   <i class='icon-left-arrow'></i>
                                   <span class='sr-only'>Previous</span>
                                   </a>
                                   </div>`;
                 this.fcarousel.append(paginationPrev);


            var  paginationNext = `<div class='fcarousel-control-next-wrapper'>
                                   <a class='fcarousel-control-next' href='javascript:' role='button' data-slide='next'>
                                   <i class='icon-right-arrow'></i>
                                   <span class='sr-only'>Next</span>
                                   </a>
                                   </div>`;
                this.fcarousel.append(paginationNext);
   }
   
   
   
   
   styleBackground()
   {
         var color = this.Color(this.fcarousel.settings.primary_color);
        var id = "custom_"+this.fcarousel.settings.id;
 
      return `
      <style>
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-item 
                {
                  border-color: ${color.lighten(2)};
                  color: ${color.lighten(2)};
                  background-color: ${color};
                }

                .${id}.fcarousel .fcarousel-control-prev-wrapper, .${id}.fcarousel .fcarousel-control-next-wrapper 
                {
                  background-color: ${color.lighten(2)}; 
                }
                
                .${id}.fcarousel .fcarousel-control-prev-wrapper .fcarousel-control-next i, .${id}.fcarousel .fcarousel-control-prev-wrapper .fcarousel-control-prev i, .${id}.fcarousel .fcarousel-control-next-wrapper .fcarousel-control-next i, .${id}.fcarousel .fcarousel-control-next-wrapper .fcarousel-control-prev i 
                {
                    color: ${color}; 
                }

                .${id}.fcarousel  .fcarousel-block .fcarousel-block-header 
                {
                  background-color: ${color.lighten(2)};
                  color: ${color}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-block .fcarousel-block-header 
                {
                  border-bottom-color: ${color.lighten(2)}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon 
                {
                  background-color: ${color.lighten(2)}; 
                }
        
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon i,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon i 
                {
                    color: ${color.lighten(0.4)}; 
                }
        
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon:hover 
                {
                    background-color: ${color.lighten(2)}; 
                }
        
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon:hover i,
                    .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon:hover i 
                {
                      color: ${color}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-details,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-details,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-details 
                {
                  color: ${color.lighten(2)}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-action .fcarousel-link-display-button a,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-action .fcarousel-product-display-button a,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-action .fcarousel-offer-display-button a 
                {
                  background-color: ${color.lighten(0.40)};
                  color: ${color.lighten(2)};
                  border-color: ${color.lighten(2)}; 
                }
       
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-action .fcarousel-link-display-button a:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-action .fcarousel-product-display-button a:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-action .fcarousel-offer-display-button a:hover 
                {
                    background-color: ${color.lighten(0.90)};
                    color: ${color}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-action .fcarousel-link-display-url span,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-action .fcarousel-product-display-url span,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-action .fcarousel-offer-display-url span 
                {
                  color: ${color.lighten(0.60)}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-end 
                {
                  border-top-color: ${color};
                  border-bottom-color: ${color}; 
                }
        
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-end .fcarousel-offer-end-title 
                {
                    background: ${color.lighten(0.90)};
                    color: ${color}; 
                }
        
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-end .fcarousel-offer-end-time 
                {
                    background: ${color.lighten(0.90)};
                    color: ${color}; 
                }
        </style>
             `;
   }
   
   
   styleNoBackground()
   {
        var color = this.Color(this.fcarousel.settings.primary_color);
        var id = "custom_"+this.fcarousel.settings.id;
 
      return `
          <style>
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-item 
                {
                  border-color: ${color};
                  color: ${color};
                  background-color: ${color.lighten(2)}; 
                }

                .${id}.fcarousel .fcarousel-control-prev-wrapper, .${id}.fcarousel .fcarousel-control-next-wrapper 
                {
                  background-color: ${color};
                }
                .${id}.fcarousel .fcarousel-control-prev-wrapper .fcarousel-control-next i, .${id}.fcarousel .fcarousel-control-prev-wrapper .fcarousel-control-prev i, .${id}.fcarousel .fcarousel-control-next-wrapper .fcarousel-control-next i, .${id}.fcarousel .fcarousel-control-next-wrapper .fcarousel-control-prev i 
                {
                    color: ${color.lighten(2)}; 
                }

                .${id}.fcarousel .fcarousel-block .fcarousel-block-header 
                {
                  background-color: ${color};
                  color: ${color.lighten(2)}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-block .fcarousel-block-header 
                {
                  border-bottom-color: ${color}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon 
                {
                  background-color: ${color.lighten(0.4)};
                  opacity: 0.9;
                }
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon i,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon i 
                {
                   color: ${color.lighten(2)}; 
                }
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-warp .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-photo-crop .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-warp .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-photo-crop .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-warp .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-photo-crop .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-warp .photo-icon:hover,
              .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-photo-crop .photo-icon:hover 
                {
                    background-color: ${color}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-details,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-details,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-details 
                {
                  color: ${color}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-action .fcarousel-link-display-button a,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-action .fcarousel-product-display-button a,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-action .fcarousel-offer-display-button a 
                {
                  background-color: ${color.lighten(0.90)};
                  color: ${color};
                  border-color: ${color}; 
                }
            
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-action .fcarousel-link-display-button a:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-action .fcarousel-product-display-button a:hover,
                  .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-action .fcarousel-offer-display-button a:hover 
                {
                    background-color: ${color.lighten(0.40)};
                    color: ${color.lighten(1)}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-link .fcarousel-link-action .fcarousel-link-display-url span,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-product .fcarousel-product-action .fcarousel-product-display-url span,
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-action .fcarousel-offer-display-url span 
                {
                  color: ${color.lighten(0.60)}; 
                }

                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-end 
                {
                  border-top-color: ${color};
                  border-bottom-color: ${color}; 
                }
                 .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-end .fcarousel-offer-end-title 
                {
                    background: ${color.lighten(0.90)};
                    color: ${color}; 
                }
            
                .${id}.fcarousel .fcarousel-outer .fcarousel-inner .fcarousel-offer .fcarousel-offer-end .fcarousel-offer-end-time 
                {
                    background: ${color.lighten(0.90)};
                    color: ${color}; 
                }
            </style>
          `;
   }
   
   style()
   {
        if(this.fcarousel.settings.primary_color)
        {
            var style;
            
            if(this.fcarousel.settings.primary_color_back === true)
            {
                 style = this.styleBackground();
            }
            else
            {
                 style = this.styleNoBackground();
            }
          
            
            $(style).appendTo("head");

        }    
        
   }
   
   
   
   
   
    
}

