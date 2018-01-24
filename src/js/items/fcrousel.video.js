/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {fitem} from './fcrousel.item.js';
export class video extends fitem {
          

    
        htmlTemplate()
        {
            this.html = `
            <div class='fcarousel-item fcarousel-link'>
            ${this.item.imgcrop? 
             `
            <div class='fcarousel-link-photo-crop photo-ratio'> 
            <div class="photo-icon"><i class="icon-play"></i></div>
            <div class='fcarousel-link-photo' style='background:url(${this.item.image});background-size: cover;'> 

            </div>
            </div>
            `:`        
            <div class='fcarousel-link-photo-warp photo-ratio'> 
            <div class="photo-icon"><i class="icon-play"></i></div>
            <img class='fcarousel-link-photo' src='${this.item.image}'>
            </div>
            `
             }

             ${this.item.link ? 
                `<a rel='fancybox_video_link_${this.item.fid}'  href='${this.item.link}' ></a>` 
            : ''}
            <div class='fcarousel-link-details'>
            <div class='fcarousel-link-title'>${this.item.title}</div>
            <div class='fcarousel-link-desc'>${this.item.description?this.item.description:' '}</div>
            </div>
            <div class='fcarousel-link-action'>
            <div class='fcarousel-link-display-url'> <span>${this.item.domain} </span></div>
            <div class='fcarousel-link-display-button'><a  href='javascript:' >${this.item.button?this.item.button:this.fcrousel.lang.watch}</a></div>
            </div>
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