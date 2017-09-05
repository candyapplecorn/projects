# == Schema Information
#
# Table name: users
#
#  id            :integer          not null, primary key
#  username      :string
#  session_token :string
#  digest        :string
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class User < ApplicationRecord
  attr_accessor :password

  validates :username, :email, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  after_initialize :ensure_session_token

  def self.find_by_credentials(params)
    @user = User.find_by(username: params[:username])
    return nil if @user.nil?
    if @user.is_password?(params[:password])
      return @user
    end
    nil
  end

  def password=(pass)
    @password = pass
    self.digest = BCrypt::Password.create(pass)
  end

  def is_password?(pass)
    BCrypt::Password.new(self.digest).is_password?(pass)
  end

  def generate_session_token
    SecureRandom::urlsafe_base64(12)
  end

  def ensure_session_token
    self.session_token ||= generate_session_token
  end

  def reset_session_token!
    self.session_token = generate_session_token
  end
end
