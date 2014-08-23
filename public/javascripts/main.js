/**
 * 无限滚动翻页
**/
$(function(){
  $('.thumbnails').scrollPagination({
    'contentPage': '/scrollpage/' + $('#contentType').val() + '/' + $('#contentName').val() + '/', // the url you are fetching the results
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


/** scroll back to top 
 *  http://plugins.svn.wordpress.org/scroll-back-to-top/tags/1.1.3/assets/js/scroll-back-to-top.js
**/
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


/*
 *为代码高亮插件对应得代码添加class
*/
$(function() {
  $('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto');
  window.prettyPrint && prettyPrint();
});


/*
 * 隐藏摘要
*/
$(function() {

  window.excerpt_show = false;
  
  $('#condensed').on('click', function(){
    $excerpt = $('.article-excerpt')
    if(window.excerpt_show === true){
      $excerpt.fadeOut();
      window.excerpt_show = false;  
    }
    else{
      $excerpt.fadeIn();
      window.excerpt_show = true;
    }    
  })
});

/*
 * 相应搜索框
 */
$(function() {
  $('#search').keyup(function(){
    if(event.keyCode == 13){
      window.location = 'http://search.aol.com/aol/search?s_it=topsearchbox.search&v_t=na&q=site%3Ablog.mpr0xy.com+' + $(this).val();
    }
  });
});

/*
 * edit title and get before and next article
 */
$(function(){
  if ($('.article-data').length){
    document.title = $('.article-title').text() + ' ---> by mpr0xy'
    var articleId = $('.article-id').val()
    $.ajax({
      type: 'GET',
      url: /articlebeforandnext/ + articleId,
      success: function(data){
        var $before = $('.before-article')
        var $next = $('.next-article')
        if (!data.before.filename){
          $before.attr('href', '/')
          $before.text('回到首页')
        }
        else{
          $before.attr('href', data.before.filename)
          $before.text('<  ' + data.before.name) 
        }
        if (!data.next.filename){
          $next.attr('href', '/')
          $next.text('回到首页')
        }
        else{
          $next.attr('href', data.next.filename)
          $next.text(data.next.name + '  >')
        }
      },
      dataType: 'json'
    });
  }
});

