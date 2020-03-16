const employeeDAL = require('../DAL/EmployeeDAL');
const employeeService = {};

employeeService.addEmployee = (req, res, next) => {
    const { employee_name, email, phone_number } = req.body;
    employeeDAL.addEmployee(employee_name, email, phone_number)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            next(err);
        });
};

employeeService.getAllEmployee = (_, res, next) => {
    employeeDAL.getAllEmployee()
        .then(result => {
            if (result.rows) {
                res.send({ rows: result.rows, rowCount: result.rowCount });
            }
        })
        .catch(err => {
            next(err);
        });
};

employeeService.getEmployeeById = (req, res) => {
    const { id } = req.body;
    employeeDAL.getEmployeeById(id)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            next(err);
        });
};

employeeService.updateEmployeeById = (req, res, next) => {
    const { id, employeeName, email, phoneNumber } = req.body;
    employeeDAL.updateEmployeeById(id, employeeName, email, phoneNumber)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            next(err);
        });
};

employeeService.deleteEmployeeById = (req, res, next) => {
    const { id } = req.body;
    employeeDAL.deleteEmployeeById(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            next(err);
        });
};

employeeService.getDeptLOV = (_, res, next) => {
    employeeDAL.getDeptLOV()
        .then(lov => {
            res.send(lov.rows);
        })
        .catch(err => {
            next(err);
        });
};

employeeService.getDesignationLOV = (_, res, next) => {
    employeeDAL.getDesignationLOV()
        .then(lov => {
            res.send(lov.rows);
        })
        .catch(err => {
            next(err);
        });
};

module.exports = employeeService;
