const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');

$(() => {
  $("button.follow-toggle").each((_, element) => {
    new FollowToggle(element);
  });

  $("nav.users-search").each((_, element) => {
    new UsersSearch(element);
  });

  $("form.tweet-compose").each((_, element) => {
    new TweetCompose(element);
  });
});
