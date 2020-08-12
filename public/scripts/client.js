/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready( function() {
  


  const createTweetElement = function(tweetData) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="username">
          <div class="avatar"><img src="${tweetData.user.avatars}" height= 50px; ></div>
          <div class="name">${tweetData.user.name}</div>
        </div>
        <div class="handle">${tweetData.user.handle}</div>
      </header>
      <div class="tweet-content">${escape(tweetData.content.text)}</div>
      <footer>
        <div class="timestamp">${moment(tweetData.created_at).fromNow()}</div>
        <div class="icons"> 
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article> `);
 
  
    return $tweet;

  };
  
  const renderTweets = function(tweets) {
    
    //sort the tweets from newest to oldest
    tweets.sort( (a, b) => {
      return b.created_at - a.created_at;
    });
    
    //Empty the container and fill it up
    $('#tweet-container').empty();
    for (const tweet of tweets) {
      $('#tweet-container').append(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}).then(renderTweets);
  }

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const tweetLength = $('#tweet-text').val().length;
    if (!tweetLength) {
      const error = `<i class="fa fa-times-circle"></i> Your tweet is empty! Add some content and try again`;
      $('.error').html(error);
      $('.error').slideDown('slow');
      return;
    } else if (tweetLength > 140) {
      const error = `<i class="fa fa-times-circle"></i> Your tweet is too long! Remove some content and try again`;
      $('.error').html(error);
      $('.error').slideDown('slow');
      return;
    } else {
      $('.error').slideUp('fast');
      $.ajax('/tweets', {method: 'POST',
        data: $(this).serialize()})
      .then(function() {
        loadTweets();
        $('#tweet-text').val('');
        console.log('Success');
      });
    }
  });

  //Function to hide/show the new tweet section
  $('.nav-link').on('click', function() {
    if ($('.new-tweet').is(':visible'))
      $('.new-tweet').slideUp('slow');
    else
      $('.new-tweet').slideDown('slow');
  })

  loadTweets();

});




