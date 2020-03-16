const bcrypt = require('bcrypt');
const userDAL = require('../DAL/UserDAL');
const jwt = require('jsonwebtoken');
const addToQueue = require('../rabbitmq/rabbitmq');
const userService = {};

userService.registerUser = async (req, res, next) => {
    const { username, password, role } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const result = await userDAL.registerUser(username, hash, role);
        addToQueue({ message: username });
        res.send(result);
    } catch (err) {
        next(err);
    }
};

userService.loginUser = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const result = await userDAL.findOne(username);
        if (result.rows.length > 0) {
            const isValidUser = await bcrypt.compare(password, result.rows[0].password)
            if (isValidUser) {
                const token = jwt.sign(
                    result.rows[0],
                    process.env.JWTSECRETKEY,
                    { expiresIn: '24h' }
                );
                await userDAL.updateLastLogin(result.rows[0].id);
                delete result.rows[0].password;
                res.send({ message: 'Logged in Successfully', token, result: result.rows[0] });
            } else {
                let err = {
                    message: 'Invalid password'
                }
                next(err);
            }
        } else {
            let err = {
                message: 'Username not found'
            }
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

userService.getRolesLOV = async (_, res, next) => {
    try {
        const roles = await userDAL.getRolesLOV();
        res.send(roles.rows);
    } catch (error) {
        next(error);
    }
}

module.exports = userService;
