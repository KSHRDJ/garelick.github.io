/*
 * Copyright (c) 2021 SymbolCode
 * Author: SymbolCode
 * This file is made for CURRENT TEMPLATE
*/


(function($){
  "use strict";
  
  
	var Garelick = {

		init: function(){
			Garelick.BgImg();
			Garelick.imgToSVG();
			Garelick.animateText();
			Garelick.navScroll();
			Garelick.resumeHover();
			Garelick.anchorJump();
		},
		
		anchorJump: function(){
			$(".garelick_sc_sidebar .navigation a").on("click",function(){
				var e   = $(this);
				var URL = e.attr("href");
				$([document.documentElement, document.body]).animate({
					scrollTop: $(URL).offset().top
				}, 1000);
				return false;
			});
		},
		
		resumeHover: function(){
			$('.section_resume li').on('mouseenter',function(){
				var element 		= $(this),
					parent			= element.closest('.resume_footer'),
					box				= parent.find('.hover_box');
				
				// calculation
				var topPosition 	= element.offset().top - parent.offset().top,
					elementHeight	= element.outerHeight();
				box.addClass('ready').css({height: elementHeight + 'px',transform:'translateY('+topPosition+'px)'});
			}).on('mouseleave',function(){
				$('.section_resume .hover_box').removeClass('ready').css({transform:'translateY(0px)'});
			});
		},
		
		navScroll: function(){
			var sidebar = $('.garelick_sc_sidebar'),
				H 		= sidebar.height(),
				ul		= sidebar.find('.navigation ul'),
				logoH	= sidebar.find('.logo').outerHeight(),
				copyH	= sidebar.find('.copyright').outerHeight(),
				over	= H-logoH-copyH,
				ulH		= ul.height();
			
			if(ulH < over){
				ul.css({paddingTop: (over-ulH)/2 + 'px', paddingBottom: (over-ulH)/2 + 'px'});
			}
			sidebar.find('.navigation').css({height: (H-logoH-copyH) + 'px'});
			if($().niceScroll){
				sidebar.find('.navigation').niceScroll({
					touchbehavior:false,
					cursorwidth:0,
					autohidemode:true,
					cursorborder:"0px solid #333"
				});
			}
			ul.addClass('ready');
		},
		
		animateText: function(){
			$('.animated_text').each(function(i){
				var e = $(this);
				var t = e.find('.text').text();
				var html = '';
				$.each(t.split(''),function(i,e){
					if(i === 0){
						html += '<span class="word">';
					}
					if(e === ' '){
						html += '</span>&nbsp<span class="word">';
					}else{
						html += '<span class="char">'+e+'</span>';
					}
				});
				e.find('.text').html(html);

//				e.waypoint({handler: function(){Garelick.animate__start(i,e);},offset:'10%'});
				e.waypoint({handler: function(){Garelick.animate__start(i,e);},offset:'85%'});
//				e.waypoint({handler: function(){Garelick.animate__stop(i,e);},offset:'0%'});
			});
		},
		animate__stop: function(i,e){
			e.removeClass('ready');
			e.find('.char').removeClass('opened');
		},
		animate__start: function(i,e){
			e.addClass('ready');
			var speed 	= 45;
			var char	= e.find('.char');
			char.each(function(ii){
				var element = $(this);
				setTimeout(function(){element.addClass('opened');},(ii*speed) + 1500);
			});
		},
		
		imgToSVG: function(){
			$('img.garelick_sc_svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},

	  	BgImg: function(){
			var div = $('*[data-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var dataBg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
    
  	};
  	
	
	// READY Functions
	$(document).ready(function(){Garelick.init();});
	
	// RESIZE Functions
	$(window).on('resize',function(){
		Garelick.navScroll();
	});
	
	// LOAD Functions
	$(window).on('load',function(){
		
		setTimeout(function(){
			
		},10);
	});
	
	// SCROLL Functions
	$(window).on('scroll',function(){
		
	});
  
})(jQuery);