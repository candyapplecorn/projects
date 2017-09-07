const APIUtil = require('./api_util');

class TweetCompose {
  constructor($el) {
    this.$form = $($el);
    this.bindEvents();
  }

  bindEvents() {
    this.$form.on("submit", this.handleSubmit.bind(this));
    $('form.tweet-compose textarea').on("keyup",
                                      this.renderCharsLeft.bind(this));
    $('a.add-mentioned-user').on('click',
                                      this.addMentionedUser.bind(this));
  }

  addMentionedUser(event){
    event.preventDefault();
    // 1 find the script tag
    const script = $('.tweet-compose script').html();

    // 2. make an anchor
    const $anchor = $('<a href="#">').text('Remove');

    // 3. add event listener to it
    $anchor.on('click', function(e){
      e.preventDefault();

      $(e.currentTarget).prev().remove();
      $(e.currentTarget).remove();

      return false;
    });

    // 4. append to script

    $('div.mentioned-users').append(script);
    $('div.mentioned-users').append($anchor);

    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    // 1. Extract values from form inputs and build json tweet
    const $textArea = $("textarea[name='tweet[content]']");
    const $select = $("select[name='tweet[mentioned_user_ids][]']");

    const content = $textArea.val();
    const mentionedUserId = $select.val();

    // 2. serialize json tweet and send to server through APIUtil
    // 3. Pass a success function that appends response tweet to tweet list
    // const data = {
    //   'tweet[content]': content,
    //   'tweet[mentioned_user_ids][]': mentionedUserId
    // };
    const data = this.$form.serializeJSON();
    APIUtil.createTweet(data, this.appendTweet.bind(this));
    this.freezeInputs();
  }

  appendTweet(tweetData) {
    const linkMaker = user => $(`<a href="/users/${user.id}" >`)
                      .text(`${user.username}`);

    // 1. Get the feed
    const $ul = $('#feed');
    // 2. Create a new <li>
    const $anchor = linkMaker(tweetData.user);
    const $li = $('<li>').text(tweetData.content + ' -- ');
    const date = ' -- ' + tweetData.created_at;
    $li.append($anchor).append(date);

    // 2.5: Make a ul of mentioned user (mentions?)
    const $mentionsUl = $('<ul>');
    const mentions = tweetData.mentions; // iterate me!

    mentions.forEach(mention => {
      // make an li with username and link to user show (id) page
      const $mentionLi = $('<li>');
      const $mentionA = linkMaker(mention.user);

      $mentionLi.append($mentionA);
    });

    // 3. Prepend <li> to <ul>
    $ul.prepend($li);
    this.clearInput();
    this.unfreezeInputs();
  }

  clearInput() {
    $('textarea').val("");
    $('select').val("");
    $('strong').text("");
    $('.mentioned-users').empty();
  }

  freezeInputs() {
    this.$form.find(':input').prop("disabled", true);
  }

  unfreezeInputs() {
    this.$form.find(':input').prop("disabled", false);
  }

  renderCharsLeft() {
    const $strong = $('form.tweet-compose strong');
    const $textArea = $('form.tweet-compose textarea');
    $strong.text(`${140 - $textArea.val().length} characters left.`);
  }
}

module.exports = TweetCompose;
