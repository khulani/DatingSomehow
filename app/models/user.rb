class User < ActiveRecord::Base
  attr_reader :password

  validates :session_token, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank" }
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  has_many :activities, dependent: :destroy
  has_many :votes, dependent: :destroy

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.find_by_credentials email, password
    user = User.find_by(email: email);
    user && user.is_password?(password) ? user : nil
  end

  def password= password
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password? password
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

end
