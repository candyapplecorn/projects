/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(3);
const APIUtil = __webpack_require__(1);

class FollowToggle {
  constructor(el){
    this.userId = $(el).data("user-id");
    this.followState = $(el).data("initial-follow-state");
    this.followButton = $(el);
    this.render();
    this.bindEvents();
  }

  render(){
    this.followButton.text(Util.capitalize(this.followState) + "!");
    // We're back from async land, so enable the button
    this.followButton.prop('disabled', false);
  }

  bindEvents(){
    this.followButton.on("click", (e) => this.handleClick(e));
  }

  toggleFollowState(){
    this.followState = this.followState === 'followed' ?
    "unfollowed" : "followed";
    this.render();
  }

  handleClick(event){
    event.preventDefault(); // wouldnt wanna re render!

    // Synchronously disable the button
    this.followButton.prop('disabled', true);

    let myPromise = this.followState === 'followed' ?
                                  APIUtil.unfollowUser(this.userId) :
                                  APIUtil.followUser(this.userId);

    myPromise.then(this.toggleFollowState.bind(this));
  }
}

module.exports = FollowToggle;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: 'JSON',
      method: "POST",
    })
  ),

  unfollowUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      dataType: 'JSON',
      method: "DELETE",
    })
  ),

  searchUsers: (queryVal, success) => (
    $.ajax({
      url: '/users/search',
      dataType: 'JSON',
      data: { query: queryVal },
      success
    })
  ),

  createTweet: (data, success) => (
    $.ajax({
      url: '/tweets',
      method: 'POST',
      dataType: 'JSON',
      data,
      success
    })
  )
};

module.exports = APIUtil;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(0);
const UsersSearch = __webpack_require__(4);
const TweetCompose = __webpack_require__(5);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const Util = {
  capitalize(str) {
    if (str.length < 1) return str;
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }
};

module.exports = Util;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);
const FollowToggle = __webpack_require__(0);

class UsersSearch {
  constructor(el){
    this.element = $(el);
    this.input = this.element.find('input');
    this.ul = this.element.find('ul');
    this.bindEvents();
  }

  bindEvents(){
    this.input.on('keyup', (event) => this.handleInput(event));
  }

  handleInput(event){ // event.target.value
    let value = $(event.currentTarget).val();//event.target.value;

    APIUtil.searchUsers(value, this.render.bind(this));
  }

  render(users){
    this.ul.empty(); // remove all the list items

    for (let user of users){
      let $li = $('<li>').text(user.username);
      let $button = $(`<button
        data-initial-follow-state="${user.followed ? 'unfollow' : 'follow'}"
        data-user-id="${user.id}"
        class="follow-toggle">`);

      new FollowToggle($button);

      $li.append($button);
      this.ul.append($li);
    }
  }
}

module.exports = UsersSearch;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(1);

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map