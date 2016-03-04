/*
 *  Project: S Gallery 
 *  Description: Responsive jQuery Gallery Plugin with CSS3 Animations inspired by http://store.sony.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=10551&storeId=10151&langId=-1&productId=8198552921666556433#gallery
 *  Author: Sara Soueidan
 *  License: Creative-Commons Attribution Non-Commercial
 */

;(function ( $, window, document, undefined ) {

    var pluginName = "sGallery",
        defaults = {
            fullScreenEnabled: false
        };

    function Plugin( element, options ) {
        this.element = element;
        this.galleryContainer = $(this.element);
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.current = "";
        this.slideshow = false;
        this.initialHeight = 'auto';
        this.isFullScreen = false;
        this.$controls = $('.controls');
        this.$control = $('.control');
        this.$grid = $('.grid');
        this.$fsButton = $('.fs-toggle');
        this.$document = $(document);
        this.$window = $(window);
        this.init();
    }

    Plugin.prototype = {

        init: function() {
            var that = this,
                smallItems = this.galleryContainer.find('ul:eq(0)'),
                smallItem = smallItems.children('li'),
                count = this.galleryContainer.children('ul:eq(1)').children('li').length,
                options = this.options;
                

            this.setDelays(smallItems);
            this.bindListHandler(smallItems);
            this.handleQuit();
            this.controlSlideShow(count);
            if(options.fullScreenEnabled){
                this.controlFullScreen();
            }
            this.changeOnResize();
            
        },

        changeOnResize: function(){
            var that=this;
            this.$window.load(function(){
                that.$window.resize(function(){

                    that.initialHeight = that.galleryContainer.outerHeight();

                    that.minHeight = that.galleryContainer.find('li.item--big').height()
                                +  parseInt(that.galleryContainer.find('.item--big').css('top'))
                                + $('.controls').height();
                });
                that.$window.trigger('resize');
            });
            
        },

        setDelays: function(smallItems){
            smallItems.children('li').each(function(index){
                $(this).css('animation-delay', 0.075 * index + 's');
            });
        },

        bindListHandler: function(smallItems){
            var that = this,
                bigItems = this.galleryContainer.children('ul:eq(1)');

            smallItems.on('click', 'li', function(e){
                e.preventDefault();
                var $this = $(this);
                that.current = $this.index();
                that.fadeAllOut();
                that.showControls();
                that.slideshow = true;
                startImg = bigItems.children('li:eq(' + that.current + ')');
                $this.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                    startImg.addClass('fadeInScaleUp').removeClass('fadeOut');
                                         });
                if(that.initialHeight < that.minHeight){
                    $(that.element).animate({'height': that.minHeight + 'px'}, 500);
                }
                    
            });
        },


        fadeAllOut: function(){
            this.galleryContainer.children('ul:eq(0)')
                     .children('li')
                     .removeClass('scaleUpFadeIn')
                     .removeClass('showLastSecond')
                     .addClass('scaleDownFadeOut');
        },

        fadeAllIn: function(){
            var that = this;
            var dropZone = this.galleryContainer.children('ul:eq(0)').children('li:eq(' + that.current + ')');
            this.galleryContainer.children('ul:eq(0)')
                     .children('li')
                     .not(dropZone)
                     .removeClass('scaleDownFadeOut')
                     .addClass('scaleUpFadeIn');

            dropZone.removeClass('scaleDownFadeOut').addClass('showLastSecond');
        },

        showControls:function(){
            this.$controls.addClass('showControls')
                          .removeClass('hideControls');
        },

        hideControls: function(){
            this.$controls.addClass('hideControls')
                          .removeClass('showControls');
        },

        controlSlideShow: function(count){

            var that = this, key;

            this.$document.on('keydown', function(e){

                var e = e || window.event;
                key = e.keyCode;

                if(key == 37 && that.slideshow){
                    that.current--;
                    if(that.current < 0) { 
                        that.current = count - 1; 
                    }
                    that.moveToNextImage();
                }
                else if(key == 39 && that.slideshow){
                    that.current++;
                    if(that.current == count) { 
                        that.current = 0; 
                    }
                    that.moveToNextImage();
                }
                
            });

            this.$control.on('click', function(){

                var direction = $(this).data('direction');

                (direction == 'next') ? that.current++ : that.current--;

                if(that.current < 0) { 
                    that.current = count - 1; 
                }
                else if(that.current == count) { 
                    that.current = 0; 
                }

                that.moveToNextImage();

            });
        },

        moveToNextImage: function(){
            var that = this,
                bigItems = this.galleryContainer.children('ul:eq(1)');

            var currentImg = bigItems.children('li:eq(' + that.current + ')')
                                         .addClass('fadeInScaleUp')
                                         .siblings('li')
                                         .filter('.fadeInScaleUp')
                                         .removeClass('fadeInScaleUp')
                                         .addClass('fadeOut')
                                         .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
                                            $(this).removeClass('fadeOut');
                                         });
        },

        handleQuit: function(){

            var that = this;

            this.$document.on('keydown', function(e){
                var e = e || window.event;
                    key = e.keyCode;

                if(key == 16 && that.slideshow){
                    that.quitSlideShow();
                }
            });
            
            this.$grid.on('click', function(){
                that.quitSlideShow();
            });
        },

        controlFullScreen: function(){
            var that = this, gallery = this.element;

            this.$fsButton.css('display', 'inline-block').on('click', function(){
               if (screenfull.enabled) {
                    screenfull.toggle(gallery);
                    if(!that.isFullScreen){
                        $(this).removeClass('icon-fullscreen').addClass('icon-fullscreen-exit');
                        that.isFullScreenfull = true;
                    }
                    else{
                        $(this).removeClass('icon-fullscreen-exit').addClass('icon-fullscreen');
                        that.isFullScreen=false;
                    }
                } 
                else {
                    return false;
                }      
            });
        },

        quitSlideShow: function(test) {
            
            this.hideControls();
            this.fadeAllIn();
            this.slideshow = false;

            var that = this;

            if(!this.isFullScreen){
                this.galleryContainer.animate({'height' : that.initialHeight}, 1000, function(){
                    $(this).css('height', 'auto');
                });
            }

            var currentImg = this.galleryContainer.children('ul:eq(1)').children('li:eq(' + that.current + ')'),
                  dropZone = this.galleryContainer.children('ul:eq(0)').children('li:eq(' + that.current + ')'),
                    height = dropZone.height(),
                     width = dropZone.width(),
                      left = dropZone.position().left,
                       top = dropZone.position().top,
                     delay = parseFloat(dropZone.css('animation-delay')),
                  duration = parseFloat(dropZone.css('animation-duration')),
                      wait = delay + duration;

            currentImg.children('img').andSelf().animate({
                'height'     : height,
                'width'      : width ,
                'left'       : left  + 'px',
                'top'        : top  + 'px',
            }, wait * 1000, function(){
                    $(this).removeClass('fadeInScaleUp').removeAttr('style');
            });
        }
    };

    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );

