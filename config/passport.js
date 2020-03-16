const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    authenticateUser = (username, password, done) => {
        getUserByUsername(username)
            .then(user => {
                if (user.rows === null || user.rows.length < 1) {
                    return done(null, false, { message: 'No user found' });
                }
                bcrypt.compare(password, user.rows[0].password)
                    .then(isValidUser => {
                        if (isValidUser) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Password incorrect' });
                        }
                    })
                    .catch(err => {
                        return done(null, false, { message: err });
                    });
            })
            .catch(err => {
                done(null, false, { message: err });
            })
    }

    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((user, done) => {
        done(null, getUserById(user.id))
    });
}

module.exports = initialize;
