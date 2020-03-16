const pool = require('../config/db');
const employeeDAL = {};

employeeDAL.addEmployee = (employee_name, email, phone_number) =>
    pool.query(`insert into emp
    (employee_name, email, phone_number)
    values ($1, $2, $3)
    RETURNING *`, [
        employee_name,
        email,
        phone_number
    ]);

employeeDAL.getAllEmployee = () => pool.query(`select * from emp`);

employeeDAL.getEmployeeById = (id) => pool.query(`select * from emp where id = $1`, [id]);

employeeDAL.updateEmployeeById = (id, employee_name, email, phone_number) =>
    pool.query(`UPDATE emp
    SET employee_name=$2, email=$3, phone_number=$4 WHERE id=$1 returning *`, [
        id,
        employee_name,
        email,
        phone_number
    ]);

employeeDAL.deleteEmployeeById = (id) => pool.query(`DELETE from emp WHERE id=$1 returning *`, [id]);

employeeDAL.getDeptLOV = () => pool.query(`SELECT * from dept`);

employeeDAL.getDesignationLOV = () => pool.query(`SELECT * from designation`);

module.exports = employeeDAL;
