const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

// --------------------------------------------- Local Account Login

router.route('/local-login')
  .post((req, res) => {
    const username = req.body.username;
    // const password = req.body.password;

    // console.log('[AUTH] Authenticating user session (with local credentials) =>', req.body);

    const authInfo = {
      username,
    };

    const successURL = '/';
    const failureURL = '/login';

    // TODO: authorize() !!!
    const isAuthorized = true;

    // Return to login form on failed attempt...
    if (!isAuthorized) {
      res.redirect(failureURL);
    }

    // On successful auth, persist auth info into session...
    const user = Object.assign({}, authInfo, { provider: 'local' });
    const session = req.session;
    session.user = user;

    req.session.save((saveError) => {
      if (saveError) console.error('[AUTH] Error: from req.session.save =>', saveError);

      // Redirect to point of invocation...
      res.redirect(successURL);
    });
  });

// --------------------------------------------- Logout

router.route('/logout')
  .get((req, res) => {
    const session = req.session;
    if (!session.user) res.redirect('/');

    // Clear user from session...
    req.session.destroy((destroyError) => {
      if (destroyError) console.log('[AUTH] Error from req.session.destroy =>', destroyError);
      res.redirect('/');
    });
  });

// --------------------------------------------- Sync
//
// router.route('/sync-to-session')
//   .get((req, res) => {
//     AuthHandler.syncToSession(req, res);
//   });

module.exports = router;
