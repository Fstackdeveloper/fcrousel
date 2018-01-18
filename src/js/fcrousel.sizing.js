/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/


export class sizing {
   
    fcarousel = null;
    
    constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
        }


    resize()
        {    
            let fcarouselInnerPaddingLeft = Number(this.fcarousel.find('.fcarousel-inner').eq(0).css("padding-left").replace('px', ''));
            let NextWarpWidth = this.fcarousel.find('.fcarousel-control-next-wrapper').eq(0).outerWidth();
            let ItemMarginLeft =   Number(this.fcarousel.find('.fcarousel-item').css("marginLeft").replace('px', ''));

            let width_cut = fcarouselInnerPaddingLeft + NextWarpWidth + ItemMarginLeft ;

                //Width For 4 Items
            let item_width_4 = (this.fcarousel.innerWidth() - width_cut)/4;
            let photo_height_4 = this.photoHeight(item_width_4);
                //Width For 3 Items
            let item_width_3 = (this.fcarousel.innerWidth() - width_cut)/3; 
            let photo_height_3 = this.photoHeight(item_width_3);
               // Width For 2 Items
            let item_width_2 = (this.fcarousel.innerWidth() - width_cut)/2;
            let photo_height_2 = this.photoHeight(item_width_2);
               // Width For 1 Items
            let item_width_1 = this.fcarousel.innerWidth() - width_cut;
            let photo_height_1 = this.photoHeight(item_width_1);
            

                let fullWidth =0;
                let height = 0;
                this.fcarousel.css('height', 'auto');
                this.fcarousel.find(".fcarousel-item").css('height', 'auto');
                
                let rootThis = this;
                this.fcarousel.find(".fcarousel-item").each(function() 
                    {
                        let marginLeft =   Number($(this).css("marginLeft").replace('px', ''));
                        let marginRight =   Number($(this).css("marginRight").replace('px', ''));
                        if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1100px)").matches) {
                            $(this).css('width', (item_width_2 - (marginRight + marginLeft)) + "px");
                            $(this).find(".photo-ratio").eq(0).css('height', photo_height_2 + "px");
                            rootThis.fcarousel['itemsPerPage'] = 2;
                            
                        }
                        else if (window.matchMedia("(min-width: 1100px)").matches)
                        {
                            $(this).css('width', (item_width_3 - (marginRight + marginLeft)) + "px");
                            $(this).find(".photo-ratio").eq(0).css('height', photo_height_3 + "px");
                            rootThis.fcarousel['itemsPerPage'] = 3;
                        }
                        else 
                        {
                           $(this).css('width', (item_width_1 - (marginRight + marginLeft)) + "px");
                            $(this).find(".photo-ratio").eq(0).css('height', photo_height_1 + "px");
                            rootThis.fcarousel['itemsPerPage'] = 1;
                        }
                        
                        
                        
                        if(Number($(this).css("height").replace('px', '')) > height)
                        {
                            height = Number($(this).css("height").replace('px', '')) ;
                        }

                        fullWidth += $(this).outerWidth(true);
                    });		
            
            
            this.fcarousel.css('height', (height + 1) + "px" );
            this.fcarousel.find(".fcarousel-item").css('height', height  + "px" );
            this.fcarousel.find( ".fcarousel-inner" ).width(fullWidth + 20);
            

        };
        
        
        
        
        
        
        photoHeight(width)
        {
          let ratio = (this.fcarousel.settings.imgRatio[0]/this.fcarousel.settings.imgRatio[1]);   
          return (width/ratio);
        }



}