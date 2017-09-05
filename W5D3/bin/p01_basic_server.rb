require 'byebug'
require 'rack'
require 'json'

app = Proc.new do |env|
  req = Rack::Request.new(env)
  res = Rack::Response.new
  res['Content-Type'] = 'text/plain'
  res.write(JSON.pretty_generate(req.env))
  res.finish
end

Rack::Server.start(
  app: app,
  Port: 3000
)
