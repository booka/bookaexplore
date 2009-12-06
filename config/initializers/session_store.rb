# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_bookaexplore_session',
  :secret      => '84c563f6431eb1fa7e893084805c72d0f81f0c55d4b193b290335df1d937ece59630e8f5fc2382f54ae1fccbb5b87fb3d65bae567a94c501f8e25262a9f9aeb4'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
