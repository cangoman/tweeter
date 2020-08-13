/* eslint-env jquery, browser */

$(document).ready(function() {
  
  const MAX_CHARS = 140;
  const SHOW_BUTTON = 300;

  // Update the character counter on the tweet
  $('#tweet-text').on('input', function() {
    const tweetLength = MAX_CHARS - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.val(tweetLength);

    if (counter.val() < 0)
      counter.addClass('red');
    else
      counter.removeClass('red');
  });
  
  //Check if we have scrolled to show the button on the bottom
  $(window).scroll(function() {
    if ($(window).scrollTop() > SHOW_BUTTON) {
      $('.btn-to-top').addClass('btn-visible');
    } else {
      $('.btn-to-top').removeClass('btn-visible');
    }
  });

  // Scroll to top and focus on new tweet when pressing the button
  $('.btn-to-top').on('click', function() {
    $('html, body').animate({scrollTop:0}, '300');
    $('.new-tweet').slideDown('slow');
    $('#tweet-text').focus();
    
  });
});