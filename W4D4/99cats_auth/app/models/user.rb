class User < ApplicationRecord
  validates :password_digest, :username, presence: true
  validates :session_token, presence: true, uniqueness: true

  has_many :cats,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'Cat'

  has_many :rental_requests,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: 'CatRentalRequest'

  attr_reader :password
  after_initialize :ensure_session_token

  def reset_session_token!
    self.session_token = ensure_session_token
    self.save
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def password= (password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    return nil unless @user
    @user.is_password?(password) ? @user : nil
  end
end
