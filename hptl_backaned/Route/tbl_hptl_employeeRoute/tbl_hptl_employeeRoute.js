const express = require('express');

const tbl_hptl_employeeRouter = express.Router()

const {getTbl_hptl_employee,getTbl_hptl_employee_byid,postTbl_hptl_employee,putTbl_hptl_employee,deleteTbl_hptl_employee} = require('../../Controller/hptl_employee_controller/hptl_employee_controller')

tbl_hptl_employeeRouter.get('/employee/get', getTbl_hptl_employee)
tbl_hptl_employeeRouter.get('/employee/getbyid/:emp_id', getTbl_hptl_employee_byid)
tbl_hptl_employeeRouter.post('/employee/post', postTbl_hptl_employee)
tbl_hptl_employeeRouter.put('/employee/put/:emp_id', putTbl_hptl_employee)
tbl_hptl_employeeRouter.delete('/employee/delete/:emp_id', deleteTbl_hptl_employee)


module.exports = {tbl_hptl_employeeRouter}