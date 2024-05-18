const express = require('express')

const departmentRouter = express.Router()

const {getDepartment,getDepartmentId,postDepartment,putDepartment,deleteDepartment} = require('../../Controller/hptl_department_controller/departmentController')

departmentRouter.get('/department/get',getDepartment)
departmentRouter.get('/department/byid/:dept_id',getDepartmentId)
departmentRouter.post('/department/add',postDepartment)
departmentRouter.put('/department/update/:dept_id',putDepartment)
departmentRouter.delete('/department/delete/:dept_id',deleteDepartment)

module.exports = {departmentRouter}

