$(function () {

    $(".image").cbFullScreenSlideShow({
        img: [
            /*"https://unsplash.it?image=680",
            "https://unsplash.it/3022/2000?image=353",
            "https://unsplash.it/3022/2000?image=978",
            "https://unsplash.it/3022/2000?image=724",*/
            "assets/img/am_fill.jpg",
            "assets/img/01.jpg",
            "assets/img/2.jpg"
        ]
    });

    $(".start").on("click", function () {
        $(".image").cbFullScreenSlideShow("start");
    });

    $(".stop").on("click", function () {
        $(".image").cbFullScreenSlideShow("stop");
    });

});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);


(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


/*nav menu------*/


$(function() {
    $('nav#menu').mmenu({
        extensions	: [ 'effect-slide-menu', 'pageshadow' ],
        searchfield	: true,
        counters	: true,
        navbar 		: {
            title		: 'Menu'
        },
        navbars		: [
            {
                position	: 'top',
                content		: [ 'searchfield' ]
            }, {
                position	: 'top',
                content		: [
                    'prev',
                    'title',
                    'close'
                ]
            },
        ]
    });
});

/*carousel----------*/
$('.carousel').carousel({
    interval: 7000
})


$('#quote-carousel').carousel({
    interval: 4000
})

/*carousel------ends----*/

/*---carousel-image overlay----------*/
$(document).ready(function(){
    if (Modernizr.touch) {
        // show the close overlay button
        $(".close-overlay").removeClass("hidden");
        // handle the adding of hover class when clicked
        $(".img").click(function(e){
            if (!$(this).hasClass("hover")) {
                $(this).addClass("hover");
            }
        });
        // handle the closing of the overlay
        $(".close-overlay").click(function(e){
            e.preventDefault();
            e.stopPropagation();
            if ($(this).closest(".img").hasClass("hover")) {
                $(this).closest(".img").removeClass("hover");
            }
        });
    } else {
        // handle the mouseenter functionality
        $(".img").mouseenter(function(){
            $(this).addClass("hover");
        })
            // handle the mouseleave functionality
            .mouseleave(function(){
                $(this).removeClass("hover");
            });
    }
});

/*---carousel-image overlay--------ends--*/

/*----------------gallary photography.....-----------------
 ----------------start-------------------------------------*/


$(function() {

    var $el = $( '#wi-el' ),
        windy = $el.windy( {
            // rotation and translation boundaries for the items transitions
            boundaries : {
                rotateX : { min : 40 , max : 90 },
                rotateY : { min : -15 , max : 45 },
                rotateZ : { min : -10 , max : 10 },
                translateX : { min : -400 , max : 400 },
                translateY : { min : -400 , max : 400 },
                translateZ : { min : 350 , max : 550 }
            }
        } ),
        allownavnext = false,
        allownavprev = false;

    $( '#nav-prev' ).on( 'mousedown', function( event ) {

        allownavprev = true;
        navprev();

    } ).on( 'mouseup mouseleave', function( event ) {

        allownavprev = false;

    } );

    $( '#nav-next' ).on( 'mousedown', function( event ) {

        allownavnext = true;
        navnext();

    } ).on( 'mouseup mouseleave', function( event ) {

        allownavnext = false;

    } );

    function navnext() {
        if( allownavnext ) {
            windy.next();
            setTimeout( function() {
                navnext();
            }, 150 );
        }
    }

    function navprev() {
        if( allownavprev ) {
            windy.prev();
            setTimeout( function() {
                navprev();
            }, 150 );
        }
    }

});
/*----------------gallary photography.....-----------------
----------------ends-------------------------------------*/

/*----------------wild photography.....-----------------
 ----------------starts-------------------------------------*/




$(function() {

    $( '#mi-slider' ).catslider();

});


/*----------------wild photography.....-----------------
 ---------------ends------------------------------------*/


/*----------------nature photography.....-----------------
 ---------------starts----------------------------------*/

$(document).ready(function(){
    $('#gallery-container').sGallery({
        fullScreenEnabled: true
    });
});
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36251023-1']);
_gaq.push(['_setDomainName', 'jqueryscript.net']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();



/*---------------nature photography.....-----------------
 ---------------ends------------------------------------*/
