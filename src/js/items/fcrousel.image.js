/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {fitem} from './fcrousel.item.js';
export class image extends fitem {
          

    
        htmlTemplate()
        {
            if(!this.item.imgcrop)
            {
                this.html = `
                <div class='fcarousel-item fcarousel-photo-warp photo-ratio' style="background:${this.item.background};border:${this.item.border};">
                <div class="photo-icon"><i class="icon-photos"></i></div>
                <img class='fcarousel-photo' src='${this.item.image}'>
                ${this.item.full_image ? 
                    `<a rel='fancybox_img_${this.item.fid}'  href='${this.item.full_image}' ></a>` 
                : ''}
                </div>
                `;
            }
            else
            {
                this.html = `
                <div class='fcarousel-item fcarousel-photo-crop' style="background:${this.item.background};border:${this.item.border};" >
                <div class="photo-icon"><i class="icon-photos"></i></div>
                <div class='fcarousel-photo photo-ratio' style='background:url("${this.item.image}");background-size: cover;'>
                ${this.item.full_image ? 
                    `<a rel='fancybox_img_${this.item.fid}'  href='${this.item.full_image}' ></a>` 
                : ''}
                 </div>
                </div>
                `;
            }
            
        }
        
        
        
       click(element)
        {
                  $.fancybox.open( $('a[rel=fancybox_img_' + this.item.fid + ']'),{
                            type: 'image',    
                            index: $( 'a[rel=fancybox_img_' + this.item.fid + ']' ).index( element.find('a').eq(0) ) 
                    }); 
        }



};