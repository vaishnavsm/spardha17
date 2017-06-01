(function($){
  $.fn.slideshow = function(n, time){
      var $this = $(this);
      var $curr = $this.children('img').first();
      $this.children('img').fadeOut(1);
      $curr.fadeIn(1);
      $this.find('.overlay').css("background-color",$curr.attr('data-overlay'));
      setTimeout(nextSlide, time, time, $this);
      //$this.append("<div id='bg-slideshow-gen-slide_"+i+"' class='bg-slideshow-holder hidden-group'><div style='background:  class='bg-slideshow-gen-slide'><div class='bg-slideshow-overlay' style='background-color: "+$curr.attr("data-overlay")+"' /></div></div>")
    // var next=(1+$this.data('slideshow-slide'))%n;
    // var $next = $this.find('#slide_'+next);
    // //alert(next+' , '+$next.attr('data-image'));
    // $this.css('background-image','url(./images/'+$next.attr('data-image')+')');
    // $this.find('.bg-overlay').css('background-color',$next.attr('data-overlay'));
    // $this.data('slideshow-slide',next);
    // //alert($this.data('slideshow-slide'));
    // setTimeout($(this).slideshow, time, n, time, $this);
  };
})( jQuery );

function nextSlide(time, $this){
  var $curr = $this.children('img').first();
  var $next = $curr.fadeOut("slow").next();
  $next.fadeIn();
  $this.find('.overlay').css("background-color",$next.attr('data-overlay'));
  $curr.appendTo($this);
  setTimeout(nextSlide, time, time, $this);
}