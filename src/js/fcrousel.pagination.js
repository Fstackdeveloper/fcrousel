export class pagination {
   waitAnimation = false;
   autoMove = null;
   fcarousel = null;
   move = false;
   
   constructor(fcarousel, move=false)
   {
       this.fcarousel = fcarousel;
       this.move = move;
       	//Auto Move	
        this.startAutoMove();
   }
   
   // Auto Pagination
   startAutoMove()
   {
       	var rootThis = this;
        if(this.move) {  
            this.autoMove = setInterval(function (){rootThis.next();}, 4000); 
        }
   }
   
   
   //Pagination By Click (Add Events)
   click()
   {
        // On Click Events (Next Prev)
	this.fcarousel.find( ".fcarousel-control-prev" ).on('click', { rootThis : this }, function(e)
            {
		e.data.rootThis.prev();
            });

	this.fcarousel.find( ".fcarousel-control-next" ).on('click', { rootThis : this }, function(e)
            {
                e.data.rootThis.next();
            });
   }
   
   
   //Pagination By swipe (for Mobile) (Add Events)
   swipe()
   {
       var rootThis = this;
      	//On Swipe Events (for Mobile)
	Hammer(this.fcarousel[ 0 ]).on("swipeleft", function(e)
            {
		rootThis.prev();   
	    });		
	
        Hammer(this.fcarousel[ 0 ]).on("swiperight", function(e) 
            {
		rootThis.next();
            });
   }
   

//Next Pages
    next()
	{
            var rootThis = this;
            if (!this.waitAnimation)
		{				 
		if(this.move) { clearInterval(this.autoMove); }			
		var length = this.fcarousel.find(".fcarousel-item" ).length;
                var target_item = length-1;
		this.waitAnimation = true;
		var vleft = this.fcarousel.find( ".fcarousel-item" ).eq(target_item).outerWidth();
		this.fcarousel.find(".fcarousel-inner" ).prepend(this.fcarousel.find( ".fcarousel-item" ).eq(target_item)).css('left',-vleft).animate({left:0},500,function(){rootThis.waitAnimation = false;					
		if(rootThis.move) { rootThis.autoMove = setInterval(function (){rootThis.next();}, 4000); }
                });}
        }

//Previous Pages
   prev()
	{
            var rootThis = this;
            if (!this.waitAnimation)
		{
		if(this.move) { clearInterval(this.autoMove); }
		var target_item = 0;
                this.waitAnimation = true;
		var vleft = this.fcarousel.find( ".fcarousel-item" ).eq(target_item).outerWidth();
		this.fcarousel.find(".fcarousel-inner" ).animate({left:-vleft},500,function(){
		rootThis.waitAnimation = false; 
		$(this).css('left',0); 
		$(this).append(rootThis.fcarousel.find( ".fcarousel-item" ).eq(target_item));
		if(rootThis.move) { rootThis.autoMove = setInterval(function (){rootThis.prev();}, 4000);}
            });}
        }
        
        
        

}