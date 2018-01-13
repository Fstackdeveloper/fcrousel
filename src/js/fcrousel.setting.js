import {uniqId} from './fcrousel.functions.js';

export class setting {
    
        settings = {    // These are the defaults
                      imgHeight: "auto",
                      imgRatio: "1:1",
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
            this.settings.imgRatio = this.settings.imgRatio.split(":");
            this.settings.imgRatio[0] = Number(this.settings.imgRatio[0]);
            this.settings.imgRatio[1] = Number(this.settings.imgRatio[1]);
        }
        
        
        get()
        {
            return this.settings;
        }
}
