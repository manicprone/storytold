// const objectUtils = require('../utils/object-utils');

// const debugLogin = false;
const debugLogout = true;

// -----------------------------------------------------------------------------
// Configuration Settings (with defaults)
// -----------------------------------------------------------------------------
// max_failed_attempts: 3,
// locked_user_duration_in_minutes: 4 * 60, // If < 1, does not lock
// session_name: 'user',
// success_return_uri: null, // If null, looks for provided "returnURL" in the request
// failure_return_uri: '/',
// expire_return_uri: '/', // If null, looks for the provided "returnURL" in the request
// password_policy: <tbd>, // Supports various types -or- explicitly defined
//                         // password policy
// -----------------------------------------------------------------------------


// -----------------------------------------------------------------------------
// Authenticates the provided username/password against locally stored
// credentials.
// -----------------------------------------------------------------------------
// (1) GET from user_credentials by username
// (1a) If 404 => failure
// (1b) Otherwise, compare credentials
//      If match => success (reset failed_attempts = 0, if modified)
//      If diff  => retry   (increment failed_attempts)
//               => failure (after configured failed_attempts is reached)
//                          (set is_locked = true, reset failed_attempts = 0)
//
// ON SUCCESS
// (2) Access user information (GET from users by username)
// (3) Store user info into the session (as 'session.user')
// (4) Redirect to the configured "successURL"
//
// ON FAILURE
// (2) Generate relevant error message, save to session
// (3) Redirect to the configured "failureURL"
// -----------------------------------------------------------------------------
function authenticate(req, res) {
  console.log('[AUTH] Authenticating user session (with local credentials) =>', req.body);

  const user = {
    id: 333,
    username: 'manicprone',
  };

  const returnURL = '/manage/profile';
  const failureURL = '/auth/login';

  // TODO: authorize() !!!
  const isAuthorized = true;

  // Return to login form on failed attempt...
  if (!isAuthorized) {
    res.redirect(failureURL);
  }

  // On successful auth, persist user into session...
  const session = req.session;
  session.user = user;

  req.session.save((saveError) => {
    if (saveError) console.error('[AUTH] Error: from req.session.save =>', saveError);

    // Redirect to point of invocation...
    res.redirect(returnURL);
  });
}

// -----------------------------------------------------------------------------
// Expires the active user session.
// -----------------------------------------------------------------------------
// (1) Destroy the user session ('session.user')
// (2) Redirect to the configured "successURL"
// -----------------------------------------------------------------------------
function expire(req, res) {
  const session = req.session;

  console.log('[AUTH] Expiring user session (with local credentials) =>', session.user);

  if (!session.user) {
    if (debugLogout === true) console.log('[AUTH] Logout called, but no user in session to logout !!!');
    res.redirect('/');
  }

  // Clear user from session...
  req.session.destroy((destroyError) => {
    if (destroyError) console.log('[AUTH] Error: from req.session.destroy =>', destroyError);

    // Redirect to home...
    res.redirect('/');
  });
}

module.exports = {
  authenticate,
  expire,
};
