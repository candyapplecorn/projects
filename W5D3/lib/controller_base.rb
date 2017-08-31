require 'active_support'
require 'active_support/core_ext'
require 'active_support/inflector'
require 'erb'
require_relative './session'
require 'byebug'

class ControllerBase
  attr_reader :req, :res, :params

  # Setup the controller
  def initialize(req, res)
    @req = req
    @res = res
    @already_built_response = false
  end

  # Helper method to alias @already_built_response
  def already_built_response?
    ret = @already_built_response
    @already_built_response = true
    ret
  end

  # Set the response status code and header
  def redirect_to(url)
    raise "Already rendered" if already_built_response?
    session.store_session(@res)

    @res.set_header('Location', url)
    @res.status = 302
  end

  # Populate the response with content.
  # Set the response's content type to the given type.
  # Raise an error if the developer tries to double render.
  def render_content(content, content_type)
    raise "Already rendered" if already_built_response?
    session.store_session(@res)

    @res.set_header('Content-Type', content_type)
    @res.write(content)
  end

  # use ERB and binding to evaluate templates
  # pass the rendered html to render_content
  def render(template_name)
    controller_name = self.class.name.underscore
    template_name = template_name.to_s
    path = "views/#{controller_name}/#{template_name}.html.erb"
    full_path = "#{Dir.pwd}/#{path}"
    template = File.read(full_path)
    evaluated = ERB.new(template).result(binding)
    render_content(evaluated, 'text/html')
  end

  # method exposing a `Session` object
  def session
    @session ||= Session.new(@req)
    @session
  end

  # use this with the router to call action_name (:index, :show, :create...)
  def invoke_action(name)
  end
end

