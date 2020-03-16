const app = require('express').Router();
const {
    registerUser,
    loginUser,
    getRolesLOV
} = require('../service/UserService');

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/getRolesLOV', getRolesLOV);

module.exports = app;
