require 'json'
require 'byebug'

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    @cookie_name = "_rails_lite_app"

    if req.cookies[@cookie_name]
      @cookie = JSON.parse(req.cookies[@cookie_name])
    else
      @cookie = {}
    end
  end

  def [](key)
    @cookie[key]
  end

  def []=(key, val)
    @cookie[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    serialized = JSON.generate(@cookie)

    res.set_cookie(@cookie_name, path: :/, value: serialized)
  end
end
