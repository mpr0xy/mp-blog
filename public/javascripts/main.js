$(function(){
  $('.thumbnails').scrollPagination({
    'contentPage': '/scrollpage/', // the url you are fetching the results
    'contentData': {}, // these are the variables you can pass to the request, for example: children().size() to know which page you are
    'scrollTarget': $(window), // who gonna scroll? in this example, the full window
    'heightOffset': 10, // it gonna request when scroll is 10 pixels before the page ends
    'beforeLoad': function(){ // before load function, you can display a preloader div
      $('#loading').fadeIn(); 
    },
    'afterLoad': function(elementsLoaded){ // after loading content, you can use this function to animate your new elements
       $('#loading').fadeOut();

       $(elementsLoaded).fadeInWithDelay();
       if ($('.thumbnails').children().size() > 200){ // if more than 100 results already loaded, then stop pagination (only for testing)
        $('#nomoreresults').fadeIn();
        $('.thumbnails').stopScrollPagination();
       }
    },
    'finally': function(){
      $('#loading').fadeOut();
      $('#nomoreresults').fadeIn();
      $('.thumbnails').stopScrollPagination();
    }
  });
  
  // code for fade in element by element
  $.fn.fadeInWithDelay = function(){
    var delay = 0;
    return this.each(function(){
      $(this).delay(delay).animate({opacity:1}, 200);
      delay += 100;
    });
  };
 
});


/* scroll back to top */
(function($){

  $(function(){
  
    $('.scroll-back-to-top-wrapper').on('click', function(){
      scrollToElement("body", 100, 0);
    });

    $(document).on( 'scroll', function(){

      if ($(window).scrollTop() > 100) {
        $('.scroll-back-to-top-wrapper').addClass('show');
      } else {
        $('.scroll-back-to-top-wrapper').removeClass('show');
      }
    });

  });

  function scrollToElement(selector, time, verticalOffset) {

    time = typeof(time) != 'undefined' ? time : 1000;
    verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
    element = $(selector);
    offset = element.offset();
    offsetTop = offset.top + verticalOffset;
    $('html, body').animate({scrollTop: offsetTop}, parseInt(time), 'linear');
  }


})(jQuery);

