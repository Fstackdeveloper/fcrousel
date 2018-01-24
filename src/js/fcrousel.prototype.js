/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};



$.fn.InheritedBackgroundColor = function(){ 

       var bc =  $(this).parent().css("background-color");
         if($(this).parent().prop("tagName") !== 'BODY')
         {
           if( bc === "rgba(0, 0, 0, 0)" ){
                 return $($(this).parent()).InheritedBackgroundColor();
              }
          }

          console.log(bc);

        return bc;
   
};
