$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const tweetLength = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.val(tweetLength);

    if (counter.val() < 0)
      counter.addClass('red');
    else
      counter.removeClass('red');
  });
});