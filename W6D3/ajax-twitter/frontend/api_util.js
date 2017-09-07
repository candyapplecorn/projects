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
