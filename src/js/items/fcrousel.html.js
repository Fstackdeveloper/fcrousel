import {fitem} from './fcrousel.item.js';
import {openNewTab} from '../fcrousel.functions.js';

export class html extends fitem {
          

    
        htmlTemplate()
        {
            
this.html = `
<div class='fcarousel-item fcarousel-html'>
${this.item.html}
</div>
`;
        
        }
        
        
        click(element)
        {
                  
        }
        


};