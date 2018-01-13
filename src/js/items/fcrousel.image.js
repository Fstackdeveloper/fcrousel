import {fitem} from './fcrousel.item.js';
export class image extends fitem {
          

    
        htmlTemplate()
        {
this.html = `
<div class='fcarousel-item fcarousel-photo-warp' style="background:${this.item.background};border:${this.item.border};">
<img class='fcarousel-photo' src='${this.item.image}'>
${this.item.full_image ? 
    `<a rel='fancybox_img_${this.item.fid}'  href='${this.item.full_image}' ></a>` 
: ''}
</div>
`;
        }
        
        
        
       click(element)
        {
                  $.fancybox.open( $('a[rel=fancybox_img_' + this.item.fid + ']'),{
                            type: 'image',    
                            index: $( 'a[rel=fancybox_img_' + this.item.fid + ']' ).index( element.find('a').eq(0) ) 
                    }); 
        }



};