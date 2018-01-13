import {fitem} from './fcrousel.item.js';
export class videoLink extends fitem {
          

    
        htmlTemplate()
        {
this.html = `
<div class='fcarousel-item fcarousel-link'>
<div class='fcarousel-link-photo' style='background:url(${this.item.image});background-size: cover;'> </div>
${this.item.link ? 
    `<a rel='fancybox_video_link_${this.item.fid}'  href='${this.item.link}' ></a>` 
: ''}
<div class='fcarousel-link-details'>
<div class='fcarousel-link-title'>${this.item.title}</div>
<div class='fcarousel-link-desc'>${this.item.description}</div>
</div>
<div class='fcarousel-link-display-url'> ${this.item.domain} </div>
</div>
`;
        }
        
        
        click(element)
        {
                  $.fancybox.open( $('a[rel=fancybox_video_link_' + this.item.fid + ']'),{
                            type: 'iframe',    
                            index: $( 'a[rel=fancybox_video_link_' + this.item.fid + ']' ).index( element.find('a').eq(0) ) 
                    }); 
        }
        


};