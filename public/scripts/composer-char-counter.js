$(document).ready(function() {
  
  const MAX_CHARS = 140;

  $('#tweet-text').on('input', function() {
    const tweetLength = MAX_CHARS - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    counter.val(tweetLength);

    if (counter.val() < 0)
      counter.addClass('red');
    else
      counter.removeClass('red');
  });
});