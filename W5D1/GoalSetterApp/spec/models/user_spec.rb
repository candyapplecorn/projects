require 'rails_helper'
require 'spec_helper'

RSpec.describe 'User', type: :model do
  subject(:gary) { FactoryGirl.build(:user) }
  let(:mary) { FactoryGirl.build(:no_username) }
  let(:nopass) { FactoryGirl.build(:no_password) }

  let(:user) do
    FactoryGirl.build(:user,
      username: "jonathan@fakesite.com",
      password: "good_password")
  end

  it { should validate_presence_of(:password_digest) }
  it { should validate_length_of(:password).is_at_least(6) }

  it "creates a pass digest when given password" do
    expect(gary.password_digest).to_not be_nil
  end

  it "creates a session token before validation" do
    gary.valid?
    expect(gary.session_token).to_not be_nil
  end

  describe ".find_by_credentials" do
    before { user.save! }

    it "returns user given good credentials" do
      expect(User.find_by_credentials(username: "jonathan@fakesite.com", password: "good_password")).to eq(user)
    end

    it "returns nil given bad credentials" do
      expect(User.find_by_credentials(username: "jonathan@fakesite.com", password: "bad_password")).to eq(nil)
    end
  end
end
