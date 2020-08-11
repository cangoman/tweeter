$(document).ready(function() {
  
  $('#tweet-text').on('keyup', function() {
    const tweetLength = 140 - $(this).val().length;
    const counter = $(this).parents().find('.counter');
    counter.val(tweetLength)

    if (counter.val() < 0)
      counter.addClass('red');
    else
      counter.removeClass('red');
  })

});