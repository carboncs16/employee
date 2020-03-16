const Joi = require('@hapi/joi');
const employeeSchema = {};

employeeSchema.addEmployeeSchema = Joi.object({
    employee_name: Joi.string().required().min(5),
    email: Joi.string().email().required().min(5),
    phone_number: Joi.string().required().min(10).max(10)
});

module.exports = employeeSchema;
