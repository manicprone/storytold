import objectUtils from '../utils/object-utils';
import appConfig from '../config/app-config';
import toModel from '../store/normalizers/toModel';

const debugAuthorize = false;
const debugSync = false;
const debugParseInfo = false;

// -----------------------------------------------------------------------------
// authorize
// -----------------------------------------------------------------------------
export function authorize(store, context) {
  return new Promise((resolve) => {
    // Obtain Joint instance for performing direct server-side actions...
    const joint = context.joint;

    // -------------------------------------------------------
    // If we have a user session, attempt to login the user...
    // -------------------------------------------------------
    const authInfo = objectUtils.get(context, 'session.user', null);
    if (authInfo) {
      const isLocalAccount = (authInfo.provider === 'local');

      if (debugAuthorize) {
        const accountTypeLabel = (isLocalAccount) ? 'local' : '3rd-party';
        console.log(`[AUTH] session found, attempting to authorize ${accountTypeLabel} user with session info =>`);
        console.log(authInfo);
      }

      // Fetch local user account...
      if (isLocalAccount) {
        return fetchUserByLocalInfo(authInfo, joint)
          .then((existingUser) => {
            if (existingUser) {
              if (debugAuthorize) {
                console.log('[AUTH] user account retrieved =>');
                console.log(existingUser);
              }

              // Log-in the user, and update the store...
              return performAuthedUserLogin(existingUser, store, context.session)
                .then(() => resolve(existingUser));
            } // end-if (existingUser)

            // -----------------------------------------------------
            // If retrieval fails, fail-safe to anonymous session...
            // -----------------------------------------------------
            if (debugAuthorize) console.log('[AUTH] user account could not be retrieved, accessing app as Anonymous');

            // Set the user as anonymous...
            store.dispatch('CLEAR_ACTIVE_USER');
            const anonUser = store.getters.activeUser;

            // Return anonymous user...
            return resolve(anonUser);
          }); // end-fetchUserByLocalInfo
      } // end-if (isLocalAccount)

      // Otherwise, check if 3rd-party user account exists for this auth session...
      return fetchUserByExternalInfo(authInfo, joint)
        .then((existingUser) => {
          if (existingUser) {
            // -----------------------------------------------------------------
            // This is a return user: sync any changes, then update the store...
            // -----------------------------------------------------------------
            if (debugAuthorize) {
              console.log('[AUTH] user account found =>');
              console.log(existingUser);
            }

            // Sync any updates on the user info...
            const diffs = diffUserInfo(existingUser, parseExternalInfo(authInfo));
            if (diffs !== null) {
              return syncUserInfo(existingUser, diffs, joint)
                .then((updatedUser) => {
                  if (debugAuthorize) {
                    console.log('[AUTH] user account was updated =>');
                    console.log(updatedUser);
                  }

                  // Log-in user, update the store...
                  return performAuthedUserLogin(updatedUser, store, context.session)
                    .then(() => resolve(updatedUser));
                }); // end-syncUserInfo
            } // end-if (diffs !== null)

            // Otherwise, if no diffs => log-in user, update the store...
            return performAuthedUserLogin(existingUser, store, context.session)
              .then(() => resolve(existingUser));
          } // end-if (existingUser)

          // ----------------------------------------------------------------
          // This is a first-time login scenario: so create a user account...
          // ----------------------------------------------------------------
          if (debugAuthorize) console.log('[AUTH] user account does not exist !!!');

          return createUserByExternalInfo(authInfo, joint)
            .then((newUser) => {
              if (debugAuthorize) {
                console.log('[AUTH] a new user account was created =>');
                console.log(newUser);
              }

              // Log-in the user, and update the store...
              return performAuthedUserLogin(newUser, store, context.session)
                .then(() => resolve(newUser));
            });
        }); // end-fetchUserByExternalInfo
    } // end-if (authInfo)

    // -----------------------------------------
    // Otherwise, enable an anonymous session...
    // -----------------------------------------
    if (debugAuthorize) {
      console.log('[AUTH] no session found, accessing app as Anonymous');
    }

    // Set the user as anonymous...
    store.dispatch('CLEAR_ACTIVE_USER');
    const anonUser = store.getters.activeUser;

    // Return anonymous user...
    return resolve(anonUser);
  });
}

// -----------------------------------------------------------------------------
// performAuthedUserLogin
// -----------------------------------------------------------------------------
function performAuthedUserLogin(user, store, session) {
  return new Promise((resolve) => {
    if (user) {
      // Log-in the user, update the store, record login time...
      user.login();
      store.dispatch('SET_ACTIVE_USER', user);
      store.dispatch('MARK_ACTIVE_USER_LOGIN');

      // Save authed app user info into the session (for the API)...
      if (session) writeUserInfoToSession(session, user.getInfo());

      // Load user settings into the store...
      return store.dispatch('LOAD_ACTIVE_USER_SETTINGS', appConfig.userSettings)
        .then(() => resolve(true));
    } // end-if (user)

    return resolve(false);
  });
}

// -----------------------------------------------------------------------------
// syncUserInfo
// -----------------------------------------------------------------------------
function syncUserInfo(user, diffs, joint) {
  return new Promise((resolve) => {
    if (user && diffs) {
      if (debugSync) console.log('[AUTH] User has updated info to sync:', diffs);

      // Prepare actions to perform...
      const updateActions = [];

      // Check for any roles to grant (add)...
      // if (diffs.roles.add && diffs.roles.add.length > 0) {
      //   if (debugSync) console.log('[AUTH] Adding new user roles:', diffs.roles.add);
      //
      //   diffs.roles.add.forEach((roleName) => {
      //     const addRole = store.dispatch('ADD_ROLE_TO_USER', { userID: user.id, role: roleName })
      //       .then(() => {
      //         if (debugSync) console.log(`[AUTH] the "${roleName}" role was granted`);
      //         return user;
      //       })
      //       .catch(() => {
      //         if (debugSync) console.log(`[AUTH] there was a problem granting the "${roleName}" role for the user`);
      //         return user;
      //       });
      //
      //     updateActions.push(addRole);
      //   });
      // }

      // Check for any roles to revoke (remove)...
      // if (diffs.roles.remove && diffs.roles.remove.length > 0) {
      //   if (debugSync) console.log('[AUTH] Removing user roles:', diffs.roles.remove);
      //
      //   diffs.roles.remove.forEach((roleName) => {
      //     const removeRole = store.dispatch('REMOVE_ROLE_FROM_USER', { userID: user.id, role: roleName })
      //       .then(() => {
      //         if (debugSync) console.log(`[AUTH] the "${roleName}" role was revoked`);
      //         return user;
      //       })
      //       .catch(() => {
      //         if (debugSync) console.log(`[AUTH] there was a problem revoking the "${roleName}" role for the user`);
      //         return user;
      //       });
      //
      //     updateActions.push(removeRole);
      //   });
      // }

      // Check for any attributes to update...
      if (diffs.attributes) {
        if (debugSync) console.log('[AUTH] Syncing changed attributes:', diffs.attributes);

        diffs.attributes.id = user.id;
        const syncAttributes = updateUserAttributes(diffs.attributes, joint);

        updateActions.push(syncAttributes);
      } // end-if (diffs.attributes)

      // Perform all relevant updates...
      return Promise.all(updateActions)
        .then(() => {
          // Now fetch updated user...
          return fetchUserByExternalID(user.external_id)
            .then((updatedUser) => {
              return resolve(updatedUser);
            });
        });
    } // end-if (user && diffs)

    // Just return original user object, if no diffs to perform...
    return resolve(user);
  });
}

// -----------------------------------------------------------------------------
// diffUserInfo
// -----------------------------------------------------------------------------
// Returns an object of non-matching user data when comparing "previous" to
// "current". If no differences, the function returns null.
//
// For differing base attributes, the return object contains the attribute/value
// pairs of the new state on a property called "attributes".
//
// For differing roles, the return object contains a property called "roles",
// which in turn contains an "add" array and/or a "remove" array, that are
// non-empty when a respective role update has been encountered.
//
// The parameters for the function:
// previous => the existing User model
// current  => the parsed user session info
// -----------------------------------------------------------------------------
// The following attributes are compared:
// + username
// + display_name
// + avatar_url
//
// The following roles are compared:
// + admin
// + moderator
// --------------------------------------
// Example return:
//
// {
//   attributes: {
//     username: 'myNewUsername',
//     display_name: 'My New Username',
//     avatar_url: 'https://path/to/avatar.jpg',
//   },
//   roles: {
//     add: ['admin'],
//     remove: ['moderator'],
//   },
// }
// -----------------------------------------------------------------------------
export function diffUserInfo(previous, current) {
  const diffs = {};
  let hasDiffs = false;

  // Compare base attributes...
  if (previous.username !== current.username) {
    hasDiffs = true;
    if (!diffs.attributes) diffs.attributes = {};
    diffs.attributes.username = current.username;
  }
  if (previous.display_name !== current.display_name) {
    hasDiffs = true;
    if (!diffs.attributes) diffs.attributes = {};
    diffs.attributes.display_name = current.display_name;
  }
  if (previous.avatar_url !== current.avatar_url) {
    hasDiffs = true;
    if (!diffs.attributes) diffs.attributes = {};
    diffs.attributes.avatar_url = current.avatar_url;
  }

  // Compare roles...
  // diffs.roles = {};
  // diffs.roles.add = [];
  // diffs.roles.remove = [];
  // const previousCanBlog = previous.hasRole('admin');
  // const currentCanBlog = (current.can_blog === 'True');
  // if (previousCanBlog !== currentCanBlog) {
  //   hasDiffs = true;
  //   if (currentCanBlog) diffs.roles.add.push('admin');
  //   else diffs.roles.remove.push('admin');
  // }
  // const previousCanModerate = previous.hasRole('moderator');
  // const currentCanModerate = (current.can_moderate === 'True');
  // if (previousCanModerate !== currentCanModerate) {
  //   hasDiffs = true;
  //   if (currentCanModerate) diffs.roles.add.push('moderator');
  //   else diffs.roles.remove.push('moderator');
  // }

  if (!hasDiffs) return null;
  return diffs;
}

// -----------------------------------------------------------------------------
//                                                               Sync to session
// -----------------------------------------------------------------------------

export function syncToSession(req) {
  return new Promise((resolve) => {
    const userInfo = objectUtils.get(req, 'query.info', null);
    const session = req.session;

    if (userInfo && session) writeUserInfoToSession(session, JSON.parse(userInfo));

    return resolve(true);
  });
}

function writeUserInfoToSession(session, info) {
  if (session) {
    session.appUser = info;
    session.save();
  }
}

// -----------------------------------------------------------------------------
//                                                           Local User Handling
// -----------------------------------------------------------------------------
function fetchUserByLocalInfo(info = {}, joint) {
  const input = {
    fields: { username: info.username },
    associations: ['profile'],
  };

  // Lookup user...
  return joint.method.User.getUser(input)
    .then((payload) => {
      const user = toModel(payload);
      return user;
    })
    .catch(() => {
      return null;
    });
}

// -----------------------------------------------------------------------------
//                                                        External User Handling
// -----------------------------------------------------------------------------

function fetchUserByExternalInfo(info = {}, joint) {
  const externalID = `${info.provider}-${info.id}`;
  return fetchUserByExternalID(externalID, joint);
}

function fetchUserByExternalID(externalID, joint) {
  const input = {
    fields: { external_id: externalID },
    associations: ['profile'],
  };

  // Lookup user...
  return joint.method.User.getUser(input)
    .then((payload) => {
      const user = toModel(payload);
      return user;
    })
    .catch(() => {
      return null;
    });
}

function createUserByExternalInfo(info = {}, joint) {
  const fields = parseExternalInfo(info);
  const userData = { fields };

  // Create user and profile...
  return joint.method.User.createUser(userData)
    .then((userPayload) => {
      const user = toModel(userPayload);
      return user;
    })
    .then((user) => {
      const profileData = {
        fields: { user_id: user.id },
      };
      return joint.method.UserProfile.createUserProfile(profileData)
        .then((profilePayload) => {
          const profile = toModel(profilePayload);
          user.setProfile(profile); // load profile into User object
          return user;
        });
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function updateUserAttributes(attributes = {}, joint) {
  const input = {
    fields: attributes,
    associations: ['profile'],
  };

  // Update user...
  return joint.method.User.updateUser(input)
    .then((payload) => {
      const user = toModel(payload);
      return user;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

function parseExternalInfo(info = {}) {
  const provider = objectUtils.get(info, 'provider', 'google');

  let parsed;
  switch (provider) {
    case 'google': parsed = parseUserInfoFromGoogle(info); break;
    default: parsed = parseUserInfoFromGoogle(info);
  }
  return parsed;
}

function parseUserInfoFromGoogle(info = {}) {
  if (debugParseInfo) console.log('[AUTH] Parsing user info from Google Plus API =>', info);

  // const domain = info.domain; // TODO: Use to prevent non-palo logins from being authorized !!!

  const externalID = `${info.provider}-${info.id}`;
  const preferredLocale = info.language;

  const firstName = (info.name && info.name.givenName)
      ? info.name.givenName
      : null;
  const lastName = (info.name && info.name.familyName)
      ? info.name.familyName
      : null;
  const displayName = firstName || info.displayName;

  const email = (info.emails && info.emails.length > 0)
      ? info.emails[0].value
      : null;

  const imageURL = (info.image && info.image.url) ? info.image.url : null;
  const avatarURL = (imageURL)
      ? imageURL.replace(/\?.+/i, '') // remove query string (contains explicit sizing)
      : null;

  const fields = {
    external_id: externalID,
    preferred_locale: preferredLocale,
    username: email,
    first_name: firstName,
    last_name: lastName,
    display_name: displayName,
    email,
    avatar_url: avatarURL,
  };

  if (debugParseInfo) console.log('[AUTH] Parsed as =>', fields);

  return fields;
}
