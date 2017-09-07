const Util = require('./util');
const APIUtil = require('./api_util');

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
