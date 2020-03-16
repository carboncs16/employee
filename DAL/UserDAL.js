const pool = require('../config/db');
const userDAL = {};

userDAL.registerUser = (username, password, role) =>
    pool.query(`insert into account
    (username, password, created_on, role_id)
    values ($1, $2, to_timestamp($3 / 1000.0), $4)
    RETURNING *`, [
        username,
        password,
        Date.now(),
        role
    ]);

userDAL.findOne = (username) => pool.query('SELECT account.*, role_name FROM account INNER JOIN role ON account.role_id = role.role_id where username = $1', [username]);

userDAL.updateLastLogin = (id) => pool.query('UPDATE account SET last_login = to_timestamp($1 / 1000.0) WHERE id = $2', [
    Date.now(),
    id
]);

userDAL.findById = (id) => pool.query('select * from account where id = $1', [id]);
userDAL.getRolesLOV = () => pool.query('SELECT * FROM role');

module.exports = userDAL;
