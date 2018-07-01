import User from '../models/user';
import passport from 'passport';
import bcrypt from 'bcrypt-nodejs'
import cuid from 'cuid'
import { createCustomer } from './pay.controller'

/**
 * Login a User
 */

function social(provider, req, res) {
  const info = req.body[provider];

  return User.findOne({id: info.id, provider: provider})
    .then(user => {
      if (user) {
        return user;
      } else {
        createCustomer({
          given_name: info.givenName,
          family_name: info.familyName,
          email_address: info.email,
          reference_id: info.id
        }).then(({ json, response }) => {

          if (!response.ok) {
            res.status(500).json({ status: 500, err: json.errors })
          } else {
            const newUser = User({
              provider: provider,
              id: info.id,
              email: info.email,

              name: {
                familyName: info.familyName,
                givenName: info.givenName
              },

              photo: info.photo,
              customerId: json.customer.id
            })

            return newUser.save();
          }
        })
      }
    });
}

export function google(req, res) {
  social('google', req, res)
    .then(user => {
      req.login(user, function(err) {
        if (err) loginFailure(req, res);
        else loginSuccess(req, res);
      });
    });
}

export function facebook(req, res) {
  social('facebook', req, res)
    .then(user => {
      req.login(user, function(err) {
        if (err) loginFailure(req, res);
        else loginSuccess(req, res);
      });
    });
}

export function loginSuccess(req, res) {
  //login process is done by passport.authenticate, so we only send success message here.
  res.status(200).json({ status: 200, message: 'Login Successfully !', user: req.user });
}

export function loginFailure(req, res) {
  res.status(400).json({ status: 400, message: 'Login Failure !' });
}

/**
 * Register a User
 */
export function register(req, res) {

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)

  const uid = cuid()

  createCustomer({
    given_name: req.body.firstName,
    family_name: req.body.lastName,
    email_address: req.body.email,
    reference_id: uid
  })
  .then(({ json, response }) => {

    if (!response.ok) {
      res.status(500).json({ status: 500, err: json.errors })
    } else {
      const newUser = new User({
        provider: 'local',
        id: uid,
        email: req.body.email,

        name: {
          familyName: req.body.lastName,
          givenName: req.body.firstName
        },

        customerId: json.customer.id,
        password: hash
      });

      return newUser.save()
    }
  })
  .then( user => res.status(201).json({ status: 201, message: 'User Registered Successfully !', user: user }) )
  .catch( err => {
    if (err.code == 11000) {
      res.status(409).json({ status: 409, message: 'The User Already Registered !' });
    } else {
      res.status(500).json({ status: 500, message: 'Internal Server Error !', err: err });
    }
  });
}

export function logout(req, res) {
  req.logout();
  res.status(200).json({ status: 200, message: 'Logout' });
}

export function getUser(req, res) {
  if (req.user) {
    res.status(200).json({ status: 200, user: req.user });
  } else {
    res.status(401).json({ status: 401, message: 'UnAuthorized.' });
  }
}

export function updateName(req, res) {
  if (!req.user) {
    return res.status(401).json({ status: 401, message: 'UnAuthorized' });
  }

  const { name } = req.body

  if ( !name ) {
    return res.status(403).json({ status: 403, message: 'Missing Parameter' })
  }

  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(500).json({ status: 404, message: 'No user is founded!' })
      }

      user.name = name

      return user.save()
    })

    .then(saved => res.status(200).json({ status: 200, saved }))

    .catch(err => res.status(500).json({ status: 500, message: 'Server Side Error',  err}))
}

export function updateEmail(req, res) {
  if (!req.user) {
    return res.status(401).json({ status: 401, message: 'UnAuthorized' });
  }

  const { email } = req.body

  if ( !email ) {
    return res.status(403).json({ status: 403, message: 'Missing Parameter' })
  }

  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(500).json({ status: 404, message: 'No user is founded!' })
      }

      user.email = email

      return user.save()
    })

    .then(saved => res.status(200).json({ status: 200, saved }))

    .catch(err => res.status(500).json({ status: 500, message: 'Server Side Error',  err}))
}

export function updateAddress(req, res) {
  if (!req.user) {
    return res.status(401).json({ status: 401, message: 'UnAuthorized' });
  }

  const { address } = req.body

  if ( !address ) {
    return res.status(403).json({ status: 403, message: 'Missing Parameter' })
  }

  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(500).json({ status: 404, message: 'No user is founded!' })
      }

      user.address = address

      return user.save()
    })

    .then(saved => res.status(200).json({ status: 200, saved }))

    .catch(err => res.status(500).json({ status: 500, message: 'Server Side Error',  err}))
}

export function updatePhone(req, res) {
  if (!req.user) {
    return res.status(401).json({ status: 401, message: 'UnAuthorized' });
  }

  const { phone } = req.body

  if ( !phone ) {
    return res.status(403).json({ status: 403, message: 'Missing Parameter' })
  }

  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(500).json({ status: 404, message: 'No user is founded!' })
      }

      user.phone = phone

      return user.save()
    })

    .then(saved => res.status(200).json({ status: 200, saved }))

    .catch(err => res.status(500).json({ status: 500, message: 'Server Side Error',  err}))
}

export function updatePassword(req, res) {
  if (!req.user) {
    return res.status(401).json({ status: 401, message: 'UnAuthorized' });
  }

  const { oldPassword, newPassword } = req.body

  if ( !oldPassword || !newPassword ) {
    return res.status(403).json({ status: 403, message: 'Missing Parameter' })
  }

  if (!bcrypt.compareSync(oldPassword, req.user.password))
    return res.status(403).json({ status: 403, message: 'Current Password is not correct.' })

  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(newPassword, salt)

  User.findOne({ _id: req.user._id })
    .then(user => {
      if (!user) {
        return res.status(500).json({ status: 404, message: 'No user is founded!' })
      }

      user.password = hash

      return user.save()
    })

    .then(saved => res.status(200).json({ status: 200, saved }))

    .catch(err => res.status(500).json({ status: 500, message: 'Server Side Error',  err}))
}
