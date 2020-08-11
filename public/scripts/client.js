/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready( function() {
  
  const createTweetElement = function(tweetData) {
    return  `
    <article class="tweet">
      <header>
        <div class="username">
          <div class="avatar"><img src="${tweetData.user.avatars}" height= 50px; ></div>
          <div class="name">${tweetData.user.name}</div>
        </div>
        <div class="handle">${tweetData.user.handle}</div>
      </header>
      <div class="tweet-content">${tweetData.content.text}</div>
      <footer>
        <div class="timestamp">${moment(tweetData.created_at).fromNow()}</div>
        <div class="icons"> 
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article> `;
  };
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweet-container').append(createTweetElement(tweet));
    }
  };


  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    const tweetLength = $('#tweet-text').val().length;
    if (!tweetLength) {
      alert('Your tweet is empty!');
      return;
    } else if (tweetLength > 140) {
      alert('Your tweet is too long!');
      return;
    } else {
      $.ajax('/tweets', {method: 'POST',
        data: $(this).serialize()})
      .then(function(tweet) {
        console.log('Success ');
      });
    }
  });

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'}).then(renderTweets);
  }
  loadTweets();

});




