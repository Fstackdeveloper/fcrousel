import {fitem} from './fcrousel.item.js';
import {openNewTab} from '../fcrousel.functions.js';

export class block extends fitem {
          

    
        htmlTemplate()
        {
            
this.html = `
<div class='fcarousel-item fcarousel-block'>
<div class='fcarousel-block-header'>
        ${this.item.title}
</div>

<div class='fcarousel-block-body'>
        ${this.item.body}
</div>
        
</div>
`;
        
        }
        
        
        click(element)
        {
                  
        }
        


};