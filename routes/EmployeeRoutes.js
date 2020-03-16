const app = require('express').Router();
const {
    addEmployee,
    getAllEmployee,
    getEmployeeById,
    updateEmployeeById,
    deleteEmployeeById,
    getDeptLOV,
    getDesignationLOV
} = require('../service/EmployeeService');
const { checkToken } = require('../config/jwt');
const { addEmployeeValidation } = require('../validations/EmployeeValidation');

app.post('/addEmployee', checkToken, addEmployeeValidation, addEmployee);
app.get('/getAllEmployee', checkToken, getAllEmployee);
app.post('/getEmployeeById', checkToken, getEmployeeById);
app.post('/updateEmployeeById', checkToken, updateEmployeeById);
app.post('/deleteEmployeeById', checkToken, deleteEmployeeById);
app.get('/getDeptLOV', checkToken, getDeptLOV);
app.get('/getDesignationLOV', checkToken, getDesignationLOV);

module.exports = app;
