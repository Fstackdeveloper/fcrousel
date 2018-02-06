/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

export class fitem {

        fcrousel = null;
        item = null;
        html = null;
        itemElement = null;
        ItemDragStart = false;
        MouseX = 0;
        
        
        constructor(item, fcrousel)
        {
           this.item = item;
           this.fcrousel = fcrousel;
           this.htmlTemplate();
           this.insertToFcrousel();
           this.onClick();
           this.onMouseDown();
        }
        
        
        htmlTemplate()
        {
            this.html = null;
        }
        
        
        insertToFcrousel()
        {
           this.itemElement = $(this.html).appendTo( this.fcrousel.find(".fcarousel-inner") );
        }
        
        
        onMouseDown()
        {
            let rootThis = this;
            this.itemElement.on("mousedown", function(e) {
                rootThis.MouseX = e.clientX;
                rootThis.onMouseMove();
                rootThis.onMouseUp();
            });
        }
        
        
         onMouseMove()
         {
            let rootThis = this;
            this.itemElement.on("mousemove", function(e) {
                if(e.which === 1) 
                    {
                        
                        if(rootThis.MouseX === e.clientX)
                        {
                            rootThis.ItemDragStart = false;
                        }
                        else
                        {
                            rootThis.ItemDragStart = true;
                        }
                        
                    }
                
            });
         }
         
         
         
         onMouseUp()
         {
            let rootThis = this;
            this.itemElement.on("mouseup", function(e) {
                      $(this).off("mousemove");
                      $(this).off("mouseup");
            });
         }
        
        onClick()
        {
            let rootThis = this;
            this.itemElement.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    if ($(this).find('a').length !== 0 && rootThis.ItemDragStart === false)
                    {
                        rootThis.click($(this));
             
                    }
                    rootThis.ItemDragStart = false;

            });
        }

        


}
