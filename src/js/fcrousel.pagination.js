/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/


export class pagination {
    
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

   //Animated Pagination
   stopOtherPaginationRequests = false;
   autoMove = false;
    
   constructor(fcrousel)
    {
       this.fcrousel = fcrousel;
       this.autoMove = this.fcrousel.settings.move;
       this.startAutoMove();      
       this.setJqueryPassiveEvent('touchstart');
       this.setJqueryPassiveEvent('touchmove');
       this.setJqueryPassiveEvent('touchend');
       this.mouseDown();
       this.touchStart();
       this.click();
    }
        
        
   // Auto Pagination
   startAutoMove()
   {
       	var rootThis = this;
        if(this.autoMove) {  
            this.fcrousel['moveInterval'] = setInterval(function (){rootThis.next();}, 4000); 
        }
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
       this.ItemWidth = this.inner.find( ".fcarousel-item" ).eq(0).outerWidth(true);
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
        this.LeftInnerWarpAfter = (this.LeftInnerWarp - this.itemsPerPageWidth);
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
    
    
    dragMoveEnd()
    {
        let rootThis = this;
        let x = (this.mouseXAfter - this.mouseX) ;
        let dragItemsCount = Math.round(x/this.ItemWidth);
        let left = (dragItemsCount * this.ItemWidth) + this.LeftInnerWarpAfter;
        
        this.inner.animate({left:left},150, function(){
            rootThis.dragItemsCountDirection();
            rootThis.removeItemsLeftRight();    
            rootThis.removeInnerLeft();
            rootThis.removeInnerWidth();
            rootThis[rootThis.DragDirection]();   
            rootThis.stopOtherPaginationRequests = false; 
        });
        
    }
    
    
    mouseDown()
    {
            let rootThis = this;
            this.fcrousel.find( ".fcarousel-item" ).on("mousedown", function(e) {  
                if(e.which === 1) 
                {
                    if (!rootThis.stopOtherPaginationRequests)
                    {
                        e.preventDefault();
                        if(rootThis.autoMove) { clearInterval(rootThis.fcrousel['moveInterval']); }
                        rootThis.stopOtherPaginationRequests = true;
                        rootThis.setVariables();
                        rootThis.mouseX = e.clientX;
                        rootThis.mouseXAfter = e.clientX;
                        rootThis.copyItemsLeftRight();
                        rootThis.setInnerLeft();
                        rootThis.setInnerWidth();            
                        rootThis.mouseMove($(this));
                        rootThis.mouseUp($(this));
                        rootThis.mouseLeave($(this));
                    }
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
            
            rootThis.dragMoveEnd();
            rootThis.removeEvents($(this));             
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
                if (!rootThis.stopOtherPaginationRequests)
                {
                    if(rootThis.autoMove) { clearInterval(rootThis.fcrousel['moveInterval']); }
                    rootThis.stopOtherPaginationRequests = true;
                    rootThis.setVariables();
                    rootThis.mouseX = e.originalEvent.changedTouches[0].clientX;
                    rootThis.mouseXAfter = e.originalEvent.changedTouches[0].clientX;  
                    rootThis.copyItemsLeftRight();
                    rootThis.setInnerLeft();
                    rootThis.setInnerWidth();            
                    rootThis.touchMove($(this));
                    rootThis.touchEnd($(this));
                }
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
            rootThis.dragMoveEnd();
            rootThis.removeEvents($(this));             
        });
    }
    
    
    
    
   //Pagination By Click (Add Events)
   click()
   {
        // On Click Events (Next Prev)
	this.fcrousel.find( ".fcarousel-control-prev" ).on('click', { rootThis : this }, function(e)
            {
		e.data.rootThis.prev();
            });

	this.fcrousel.find( ".fcarousel-control-next" ).on('click', { rootThis : this }, function(e)
            {
                e.data.rootThis.next();
            });
   }



    
    
    
//Next Pages (For Drag and Touch)    
    right()
    {
        let rootThis = this;
        for(let i = this.ItemsCount; i > (this.ItemsCount - this.dragItemsCount); i--)
        {
          this.inner.prepend(this.inner.find( ".fcarousel-item" ).eq(this.ItemsCount-1));
        }
        if(this.autoMove) { this.fcrousel['moveInterval'] = setInterval(function (){rootThis.next();}, 4000); }
    }
    

//Previous Pages (For Drag and Touch)    
    left()
    {
        let rootThis = this;
        for(let i = 0; i < this.dragItemsCount; i++)
        {
           this.inner.append(this.inner.find( ".fcarousel-item" ).eq(0));
        }
        if(this.autoMove) { this.fcrousel['moveInterval'] = setInterval(function (){rootThis.prev();}, 4000);}
    }
    
    
    

 //Next Pages (For Click & AutoMove)    
    next()
	{
            var rootThis = this;
            if (!this.stopOtherPaginationRequests)
		{				 
		if(this.autoMove) { clearInterval(this.fcrousel['moveInterval']); }			
		var length = this.fcrousel.find(".fcarousel-item" ).length;
                var target_item = length-1;
		this.stopOtherPaginationRequests = true;
		var vleft = this.fcrousel.find( ".fcarousel-item" ).eq(target_item).outerWidth();
		this.fcrousel.find(".fcarousel-inner" ).prepend(this.fcrousel.find( ".fcarousel-item" ).eq(target_item)).css('left',-vleft).animate({left:0},300,function(){rootThis.stopOtherPaginationRequests = false;					
		if(rootThis.autoMove) { rootThis.fcrousel['moveInterval'] = setInterval(function (){rootThis.next();}, 4000); }
                });}
        }

//Previous Pages (For Click & AutoMove)  
   prev()
	{
            var rootThis = this;
            if (!this.stopOtherPaginationRequests)
		{
		if(this.autoMove) { clearInterval(this.fcrousel['moveInterval']); }
		var target_item = 0;
                this.stopOtherPaginationRequests = true;
		var vleft = this.fcrousel.find( ".fcarousel-item" ).eq(target_item).outerWidth();
		this.fcrousel.find(".fcarousel-inner" ).animate({left:-vleft},300,function(){
		rootThis.stopOtherPaginationRequests = false; 
		$(this).css('left',0); 
		$(this).append(rootThis.fcrousel.find( ".fcarousel-item" ).eq(target_item));
		if(rootThis.autoMove) { rootThis.fcrousel['moveInterval'] = setInterval(function (){rootThis.prev();}, 4000);}
            });}
        }

    
}