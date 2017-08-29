class User < ApplicationRecord
  validates :password_digest, :session_token, :username, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true
  attr_accessor :password

  after_initialize :ensure_session_token

  has_many :links
  has_many :comments

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(12)
  end
  def ensure_session_token
    self.session_token ||= reset_session_token!
  end
  def password=(pass)
    @password = pass
    self.password_digest = BCrypt::Password.create(pass)
  end
  def is_password?(pass)
    BCrypt::Password.new(self.password_digest).is_password?(pass)
  end
  def self.find_by_credentials(creds)
    user = self.find_by(username: creds[:username])
    return nil unless user
    user.is_password?(creds[:password]) ? user : nil
  end
end
