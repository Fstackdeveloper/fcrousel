/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {uniqId} from './fcrousel.functions.js';

export class setting {
    
        settings = {    // These are the defaults
                      imgheight: "auto",
                      imgratio: "4:3",
                      imgcrop: false,
                      radius: '0',
                      move: false,
                      background: "#fff;",
                      border: "#ccc 1px solid;"
                    };
                    
        constructor(data)
        {
             // This is the easiest way to have default options.
             this.settings = $.extend(this.settings, data );               
             this.generateUniqueID();
             this.imgRatio();
        }  
        
        
        generateUniqueID()
        {
            //Generate Unique ID for fcrousel
            this.settings.id = uniqId();       
        }
        
        
        imgRatio()
        {
            this.settings.imgRatio = this.settings.imgratio.split(":");
            this.settings.imgRatio[0] = Number(this.settings.imgRatio[0]);
            this.settings.imgRatio[1] = Number(this.settings.imgRatio[1]);
        }
        
        
        get()
        {
            return this.settings;
        }
}
