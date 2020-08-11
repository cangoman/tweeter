/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



 // Temporarily import the "database"
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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

  renderTweets(data);

  $('#submit-tweet').submit(function(event) {
    event.preventDefault();
    $.ajax('/tweets', {method: 'POST',
      data: $(this).serialize()})
    .then(function(tweet) {
      console.log('Success ');
    });
  })
});




