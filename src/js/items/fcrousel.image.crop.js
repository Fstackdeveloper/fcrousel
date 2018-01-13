import {fitem} from './fcrousel.item.js';
export class imageCrop extends fitem {
          

    
        htmlTemplate()
        {
this.html = `
<div class='fcarousel-item fcarousel-photo-crop' style='background:url("${this.item.image}");background-size: cover;'>
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