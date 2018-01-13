export class fitem {

        fcrousel = null;
        item = null;
        html = null;
        itemElement = null;
        
        
        constructor(item, fcrousel)
        {
           this.item = item;
           this.fcrousel = fcrousel;
           this.htmlTemplate();
           this.insertToFcrousel();
           this.onClick();
        }
        
        
        htmlTemplate()
        {
            this.html = null;
        }
        
        
        insertToFcrousel()
        {
           this.itemElement = $(this.html).appendTo( this.fcrousel.find(".fcarousel-inner") );
        }
        
        
        onClick()
        {
            let rootThis = this;
            this.itemElement.on('click', function(e) {
                    e.preventDefault();
                    if ($(this).find('a').length !== 0)
                    {
                        rootThis.click($(this));
             
                    }

            });
        }

        


}
