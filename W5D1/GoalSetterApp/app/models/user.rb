class User < ApplicationRecord
  validates :password_digest, :username, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  attr_accessor :password
  after_initialize :ensure_session_token

  def ensure_session_token
    self.session_token ||= reset_session_token!
  end
  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(12)
  end
  def password=(pass)
    @password = pass
    self.password_digest = BCrypt::Password.create(@password)
  end

  def is_password?(pass)
    BCrypt::Password.new(self.password_digest).is_password?(@password)
  end

  def self.find_by_credentials(credentials)
    user = User.find_by(username: credentials[:username])
    return nil unless user
    user.is_password?(credentials[:password]) ? user : nil
  end
end
