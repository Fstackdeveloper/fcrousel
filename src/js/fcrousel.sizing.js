export class sizing {
   
    fcarousel = null;
    
    constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
        }


    width()
        {    
            let fcarouselInnerPaddingLeft = Number(this.fcarousel.find('.fcarousel-inner').eq(0).css("padding-left").replace('px', ''));
            let NextWarpWidth = this.fcarousel.find('.fcarousel-control-next-wrapper').eq(0).outerWidth();
            let ItemMarginLeft =   Number(this.fcarousel.find('.fcarousel-item').css("marginLeft").replace('px', ''));

            let width_cut = fcarouselInnerPaddingLeft + NextWarpWidth + ItemMarginLeft ;

                //Width For 4 Items
            let item_width_4 = (this.fcarousel.innerWidth() - width_cut)/4;
                //Width For 3 Items
            let item_width_3 = (this.fcarousel.innerWidth() - width_cut)/3;  
               // Width For 2 Items
            let item_width_2 = (this.fcarousel.innerWidth() - width_cut)/2;
               // Width For 1 Items
            let item_width_1 = this.fcarousel.innerWidth() - width_cut;

                var fullWidth =0;
                this.fcarousel.find(".fcarousel-item").each(function() 
                    {
                        let marginLeft =   Number($(this).css("marginLeft").replace('px', ''));
                        let marginRight =   Number($(this).css("marginRight").replace('px', ''));
                        if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1100px)").matches) {
                            $(this).css('width', (item_width_2 - (marginRight + marginLeft)) + "px");
                        }
                        else if (window.matchMedia("(min-width: 1100px)").matches)
                        {
                            $(this).css('width', (item_width_3 - (marginRight + marginLeft)) + "px");
                        }
                        else 
                        {
                           $(this).css('width', (item_width_1 - (marginRight + marginLeft)) + "px");
                        }

                        fullWidth += $(this).outerWidth(true);
                    });		
                this.fcarousel.find( ".fcarousel-inner" ).width(fullWidth + 20);

        };



}