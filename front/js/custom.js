$(document).ready(function(){
//Navbar Fade in after section
  $(".navbar-custom").hide(); //Hide the navigation bar first
    $(window).scroll(function () {  
        if (isScrolledAfterElement("#about")) { 
            $('.navbar-custom').fadeIn();  
        } else {
            $('.navbar-custom').fadeOut(); 
        }
    });
//Navbar Fade Done
$("#top").slideshow(3,6000);
$("#top").parallax("50%",-0.3,true);
$("#about").parallax("100%",-0.7);
});

//Function that returns true if the window has scrolled beyond the given element
function isScrolledAfterElement(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height()/1.5;

    var elemTop = $elem.offset().top;

    return elemTop <= docViewBottom;
}

(function($){
  $.fn.slideshow = function(n, time, this_context){
    var $this = null;
    if(arguments.length<3 || this_context == null) $this = $(this);
    else $this = this_context; 
    var next=(1+$this.data('slideshow-slide'))%n;
    var $next = $this.find('#slide_'+next);
    //alert(next+' , '+$next.attr('data-image'));
    $this.css('background-image','url(./images/'+$next.attr('data-image')+')');
    $this.find('.bg-overlay').css('background-color',$next.attr('data-overlay'));
    $this.data('slideshow-slide',next);
    //alert($this.data('slideshow-slide'));
    setTimeout($(this).slideshow, time, n, time, $this);
  };
})( jQuery );