/* 
    Created on : Jan 14, 2018, 8:40:09 PM
    Author     : Mohamed Al Moelef
    Email      : info@fullstackdeveloper.org
    Website    : fullstackdeveloper.org
*/

import {fitem} from './fcrousel.item.js';
import {openNewTab} from '../fcrousel.functions.js';

export class offer extends fitem {
          

    
        htmlTemplate()
        {
            
            this.CountDownTimer(this.item.offer_end, "offer_"+this.item.id);
            this.checkExpired();
            
            this.html = `
            <div class='fcarousel-item fcarousel-offer'>
            ${this.item.imgcrop? 
             `
            <div class='fcarousel-offer-photo-crop photo-ratio'> 
            <div class="photo-icon"><i class="icon-offer"></i></div>
            <div class='fcarousel-offer-photo' style='background:url(${this.item.image});background-size: cover;'> 

            </div>
            </div>
            `:`        
            <div class='fcarousel-offer-photo-warp photo-ratio'> 
            <div class="photo-icon"><i class="icon-offer"></i></div>
            <img class='fcarousel-offer-photo' src='${this.item.image}'>
            </div>
            `
             }

             ${this.item.link ? 
                `<a  href='${this.item.link}' ></a>` 
            : ''}
            
            <div class="fcarousel-offer-price">
            <div class="fcarousel-offer-price-before">
            ${this.item.price_before}
            </div>
            <div class="fcarousel-offer-price-now">
            ${this.item.price}
            </div>
            </div>

            
            <div id="offer_${this.item.id}" class="fcarousel-offer-end">
            <div class="fcarousel-offer-end-title">
             ${this.fcrousel.lang.offer_end}
            </div>
            <div class="fcarousel-offer-end-time">
            <div class="days"> <span></span> ${this.fcrousel.lang.days}</div>
            <div class="hours"> <span></span> ${this.fcrousel.lang.hours}</div>
            <div class="minutes"> <span></span> ${this.fcrousel.lang.minutes}</div>
            <div class="seconds"> <span></span> ${this.fcrousel.lang.seconds}</div>
            </div>
            </div>
            <div class='fcarousel-offer-details'>
            <div class='fcarousel-offer-title'>${this.item.title}</div>
            <div class='fcarousel-offer-desc'>${this.item.description?this.item.description:' '}</div>
            </div>
            <div class='fcarousel-offer-action'>
            <div class='fcarousel-offer-display-url'> <span>${this.item.domain} </span></div>
           ${!this.item.expired? 
           `<div class='fcarousel-offer-display-button'><a  href='${this.item.link}' >${this.item.button?this.item.button:this.fcrousel.lang.get_offer}</a></div>`
           :''}
            </div>
            </div>
            `;
        
        
        }
        
        
        click(element)
        {
               if (!this.item.expired)
               {
                  openNewTab(this.item.link);
               }
        }
        
        
        
        checkExpired()
        {
            var end = new Date(this.item.offer_end);            
            var now = new Date();
            var distance = end - now;
                if (distance < 0) {
                    this.item['expired'] = true;    
                }
        }
        
        
        
        
        CountDownTimer(dt, id)
        {
            var end = new Date(dt);
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var timer;
            var rootThis =this;

            function showRemaining() {
                var now = new Date();
                var distance = end - now;
                if (distance < 0) {

                    clearInterval(timer);
                    document.getElementById(id).innerHTML = '<div class="fcarousel-offer-end-title">'+rootThis.fcrousel.lang.expired+'</div>';

                    return;
                }
                var days = Math.floor(distance / _day);
                var hours = Math.floor((distance % _day) / _hour);
                var minutes = Math.floor((distance % _hour) / _minute);
                var seconds = Math.floor((distance % _minute) / _second);

                $('#'+id).find('.days').eq(0).find('span').eq(0).text(days);
                $('#'+id).find('.hours').eq(0).find('span').eq(0).text(hours);
                $('#'+id).find('.minutes').eq(0).find('span').eq(0).text(minutes);
                $('#'+id).find('.seconds').eq(0).find('span').eq(0).text(seconds);
            }

            timer = setInterval(showRemaining, 1000);
        }



};