require 'rails_helper'
require 'spec_helper'

RSpec.describe 'User', type: :model do
  subject(:gary) { FactoryGirl.build(:user) }
  let(:mary) { FactoryGirl.build(:no_username) }
  let(:nopass) { FactoryGirl.build(:no_password) }

  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:password_digest) }
  it { should validate_length_of(:password).is_at_least(6) }

  it "creates a pass digest when given password" do
    expect(user.password_digest).to_not be_nil
  end

  it "creates a session token before validation" do
    gary.valid?
    expect(user.session_token).to_not be_nil
  end

  describe ".find_by_credentials" do
    before { gary.save! }

    it "finds a username by credentials" do
      expect(User.find_by_credentials(gary.username, gary.password).to eq(gary))
    end
  end
end
