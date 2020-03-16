const { addEmployeeSchema } = require('./EmployeeSchema');
const validationEmployee = {};

validationEmployee.addEmployeeValidation = (req, res, next) => {
    const err = addEmployeeSchema.validate(req.body);
    if (err.error) {
        res.status(400).json({
            message: err
        });
    } else {
        next();
    }
};

module.exports = validationEmployee;
