FactoryGirl.define do
  factory :user do
    username { Faker::Name.name }
    password_digest { BCrypt::Password.create(
                        SecureRandom::urlsafe_base64(8)) }
    session_token { SecureRandom::urlsafe_base64(12) }
    password { Faker::Ancient.hero }

    factory :no_username do
      username = ''
    end

    factory :no_password do
      password = ''
    end
  end
end
