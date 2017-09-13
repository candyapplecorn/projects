require 'test_helper'

class Api::TodosControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_todos_controller.rb_create_url
    assert_response :success
  end

  test "should get update" do
    get api_todos_controller.rb_update_url
    assert_response :success
  end

  test "should get index" do
    get api_todos_controller.rb_index_url
    assert_response :success
  end

  test "should get destroy" do
    get api_todos_controller.rb_destroy_url
    assert_response :success
  end

  test "should get show" do
    get api_todos_controller.rb_show_url
    assert_response :success
  end

end
