/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {ar} from './fcrousel.ar.js';
import {en} from './fcrousel.en.js';

export class language {
   
       constructor(fcarousel)
        {
           this.fcarousel = fcarousel;
           
           if(!this.fcarousel.data('lang'))
           {
              return en; 
           }
           
           switch(this.fcarousel.data('lang'))
           {
               case  'ar':
                   return ar;
                break;
                case 'en':
                     return en;
                break;

           }
           
        } 
}