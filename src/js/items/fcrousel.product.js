/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {fitem} from './fcrousel.item.js';
import {openNewTab} from '../fcrousel.functions.js';

export class product extends fitem {
          

    
        htmlTemplate()
        {
                        
            this.html = `
            <div class='fcarousel-item fcarousel-product'>
            ${this.item.imgcrop? 
             `
            <div class='fcarousel-product-photo-crop photo-ratio'> 
            <div class="photo-icon"><i class="icon-cart"></i></div>
        
            <div class="fcarousel-product-price">
         ${this.item.price_before?
            `<div class="fcarousel-product-before">
            ${this.item.price_before}
            </div>`:''}    
            <div class="fcarousel-product-now">
            ${this.item.price}
            </div>
            </div>
        
            <div class='fcarousel-product-photo' style='background:url(${this.item.image});background-size: cover;'> 

            </div>
            </div>
            `:`        
            <div class='fcarousel-product-photo-warp photo-ratio'> 
            <div class="photo-icon"><i class="icon-cart"></i></div>
        
            <div class="fcarousel-product-price">
         ${this.item.price_before?
            `<div class="fcarousel-product-before">
            ${this.item.price_before}
            </div>`:''}    
            <div class="fcarousel-product-now">
            ${this.item.price}
            </div>
            </div>
        


            <img class='fcarousel-product-photo' src='${this.item.image}'>
            </div>
            `
             }

             ${this.item.link ? 
                `<a  href='${this.item.link}' ></a>` 
            : ''}
            



            <div class='fcarousel-product-details'>
            <div class='fcarousel-product-title'>${this.item.title}</div>
            <div class='fcarousel-product-desc'>${this.item.description}</div>
            </div>
            <div class='fcarousel-product-action'>
            <div class='fcarousel-product-display-url'> <span>${this.item.domain} </span></div>
            <div class='fcarousel-product-display-button'><a  href='${this.item.link}' >Buy</a></div>
            </div>
            </div>
            `;
        
        
        }
        
        
        click(element)
        {
                  
                  openNewTab(this.item.link);
        }
        
        
        
        



};