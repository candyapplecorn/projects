const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

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
