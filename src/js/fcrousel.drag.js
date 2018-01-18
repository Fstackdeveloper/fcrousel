/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/


export class drag {
    
   fcrousel;
   itemsPerPageWidth;
   itemsPerPage;
   LeftInnerWarp;
   LeftInnerWarpAfter;
   ItemWidth;
   mouseX;
   mouseXAfter;
   ItemsCount;
   inner;
   innerWidth;
   innerWidthAfter;
   dragItemsCount;
   DragDirection;
  
   
   constructor(fcrousel)
    {
       this.fcrousel = fcrousel; 
       this.setJqueryPassiveEvent('touchstart');
       this.setJqueryPassiveEvent('touchmove');
       this.setJqueryPassiveEvent('touchend');
       this.mouseDown();
       this.touchStart();
    }
    
    
    setJqueryPassiveEvent(event)
    {
         jQuery.event.special[event] = {
            setup: function( _, ns, handle ){
                if ( ns.includes("noPreventDefault") ) {
                    this.addEventListener(event, handle, { passive: false });
                } else {
                    this.addEventListener(event, handle, { passive: true });
                }
            }
        };
    }
    
    
    setVariables()
    {
       this.inner = this.fcrousel.find(".fcarousel-inner" ).eq(0);
       this.ItemWidth = this.inner.find( ".fcarousel-item" ).eq(0).outerWidth();
       this.itemsPerPage = this.fcrousel['itemsPerPage'];
       this.itemsPerPageWidth =  this.ItemWidth * this.itemsPerPage;
       this.LeftInnerWarp =Number(this.inner.css("left").replace('px', ''));
       this.ItemsCount = this.inner.find(".fcarousel-item" ).length;
       this.innerWidth = this.inner.width();
    }

    setInnerLeft()
    {
        let NextWarpWidth = this.fcrousel.find('.fcarousel-control-next-wrapper').eq(0).outerWidth();
        let ItemMarginLeft =   Number(this.inner.find('.fcarousel-item').css("marginLeft").replace('px', ''));
        let ItemMarginRight =   Number(this.inner.find('.fcarousel-item').css("marginRight").replace('px', ''));            
        this.LeftInnerWarpAfter = this.LeftInnerWarp - this.itemsPerPageWidth -  NextWarpWidth + ItemMarginLeft + ItemMarginRight;        
        this.inner.css('left', this.LeftInnerWarpAfter);
    }
    
    removeInnerLeft()
    {
        this.inner.css('left', this.LeftInnerWarp);
    }
    
    
    setInnerWidth()
    {
        this.innerWidthAfter = (2*this.itemsPerPageWidth) + this.innerWidth;
        this.inner.css('width',this.innerWidthAfter);
    }
    
    
    removeInnerWidth()
    {
        this.inner.css('width',this.innerWidth);
    }
    
    
    
    copyItemsLeftRight()
    {                
                for(let i = (this.ItemsCount-1); i >= (this.ItemsCount - this.itemsPerPage); i--)
                {
                    let cloned = this.inner.find( ".fcarousel-item" ).eq(this.ItemsCount-1).clone(true);
                    cloned.addClass('fcarousel-item-copy');
                    this.inner.prepend(cloned);
                }
                
                
                for(let i = this.itemsPerPage; i < 2*this.itemsPerPage; i++)
                {
                   let cloned = this.inner.find( ".fcarousel-item" ).eq(i).clone(true);
                   cloned.addClass('fcarousel-item-copy');
                   this.inner.append(cloned);
                }
                
    }
    
    
    removeItemsLeftRight()
    {
         this.inner.find('.fcarousel-item-copy').remove();
    }
    
    
    
    dragItemsCountDirection()
    {
         let left = (this.mouseXAfter - this.mouseX) ;
         this.dragItemsCount = Math.round(left/this.ItemWidth);
         this.DragDirection = (this.dragItemsCount > 0)?'right':'left';         
         this.dragItemsCount = (this.dragItemsCount > 0)?this.dragItemsCount:(this.dragItemsCount*-1);         
    }
    
    
    removeEvents(item)
    {
        item.off("mousemove");
        item.off("mouseup");
        item.off("mouseleave");
        item.off("touchmove");
        item.off("touchend");
    }
    
    
    
    mouseDown()
    {
        let rootThis = this;
        this.fcrousel.find( ".fcarousel-item" ).on("mousedown", function(e) {  
            if(e.which === 1) 
            {
                e.preventDefault();
                rootThis.setVariables();
                rootThis.mouseX = e.clientX;
                rootThis.copyItemsLeftRight();
                rootThis.setInnerLeft();
                rootThis.setInnerWidth();            
                rootThis.mouseMove($(this));
                rootThis.mouseUp($(this));
                rootThis.mouseLeave($(this));
            }
        });
    }
    
    
    
    mouseMove(item)
    {
        let rootThis = this;
        item.on("mousemove", function(e) {
            if(e.which === 1) 
            {
                e.preventDefault();
                rootThis.mouseXAfter = e.clientX;                      
                let left = (rootThis.mouseXAfter - rootThis.mouseX) + rootThis.LeftInnerWarpAfter;   
                rootThis.inner.css('left',left);    
            }
            else
            {
              $(this).trigger( "mouseup" );
            } 
        });

    }
    
    
    
    mouseUp(item)
    {
        let rootThis = this;
        item.on("mouseup", function(e) {
            rootThis.dragItemsCountDirection();
            rootThis.removeItemsLeftRight();    
            rootThis.removeInnerLeft();
            rootThis.removeInnerWidth();
            rootThis.removeEvents($(this));  
            rootThis[rootThis.DragDirection]();            
        });
    }
    
    
    
    mouseLeave(item)
    {
        item.on("mouseleave",function(e) { 
            $(this).trigger( "mouseup" );
        });
    }
    
    
    touchStart()
    {
        let rootThis = this;
        this.fcrousel.find( ".fcarousel-item" ).on("touchstart", function(e) {  
            rootThis.setVariables();
            rootThis.mouseX = e.originalEvent.changedTouches[0].clientX;
            rootThis.copyItemsLeftRight();
            rootThis.setInnerLeft();
            rootThis.setInnerWidth();            
            rootThis.touchMove($(this));
            rootThis.touchEnd($(this));
        });

    }
    
    
    
   touchMove(item)
    {
        let rootThis = this;
        item.on("touchmove", function(e) {
            rootThis.mouseXAfter = e.originalEvent.changedTouches[0].clientX;                    
            let left = (rootThis.mouseXAfter - rootThis.mouseX) + rootThis.LeftInnerWarpAfter;   
            rootThis.inner.css('left',left);    
        });

    }
    
    
    
    touchEnd(item)
    {
        let rootThis = this;
        item.on("touchend", function(e) {
            rootThis.dragItemsCountDirection();
            rootThis.removeItemsLeftRight();    
            rootThis.removeInnerLeft();
            rootThis.removeInnerWidth();
            rootThis.removeEvents($(this));  
            rootThis[rootThis.DragDirection]();            
        });
    }


    
    
    
    
    right()
    {
        for(let i = this.ItemsCount; i > (this.ItemsCount - this.dragItemsCount); i--)
        {
          this.inner.prepend(this.inner.find( ".fcarousel-item" ).eq(this.ItemsCount-1));
        }
    }
    
    
    left()
    {
        for(let i = 0; i < this.dragItemsCount; i++)
        {
           this.inner.append(this.inner.find( ".fcarousel-item" ).eq(0));
        }
    }
    
}