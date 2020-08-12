/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready( function() {
  
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const validateTweet = function(tweet) {
    let error = "";
    if (tweet.length === 0){
      error = `<i class="fa fa-times-circle"></i> Your tweet is empty! Add some content and try again`;
    } else if (tweet.length > 140) {
      error = `<i class="fa fa-times-circle"></i> Your tweet is too long! Remove some content and try again`;
    }
    return error;
  }

  const createTweetElement = function(tweetData) {
    return $(`
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

  };
  
  const renderTweets = function(tweets) {
    
    //sort the tweets from newest to oldest
    // tweets.sort( (a, b) => {
    //   return b.created_at - a.created_at;
    // });
    
    //Empty the container and fill it up
    $('#tweet-container').empty();
    for (const tweet of tweets) {

      // if you use prepend => might not need to sort the tweets
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(renderTweets)
      .catch(err => console.log(err.message));
  }

  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const error = validateTweet($('#tweet-text').val());
    if (error) {
      $('.error').html(error);
      $('.error').slideDown('slow');
    } else {
      $('.error').slideUp('fast');
      $.ajax('/tweets', {method: 'POST',
        data: $(this).serialize()})
      .then(function(response) {
        console.log(response);
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').val('140');
      })
      .catch( err => console.log(err.message)
      );
    }
  });

  //Function to hide/show the new tweet section
  $('.nav-link').on('click', function() {
    if ($('.new-tweet').is(':visible'))
      $('.new-tweet').slideUp('slow');
    else {
      $('.new-tweet').slideDown('slow');
      $('#tweet-text').focus();
    }
  })

  loadTweets();

});




