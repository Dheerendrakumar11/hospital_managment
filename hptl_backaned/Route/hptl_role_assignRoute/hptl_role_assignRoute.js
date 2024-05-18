const express = require('express');

const roleAssignRouter = express.Router();

const {getRoleAssign,getRoleAssignById,postRoleAsssign,putRoleAssign,deleteRoleAssign} = require('../../Controller/tbl_hptl_role_assignController/tbl_hptl_role_assign');

roleAssignRouter.get('/api/assign',getRoleAssign);
roleAssignRouter.get('/assign/get/:emp_id',getRoleAssignById);
roleAssignRouter.post('/assign/post',postRoleAsssign);
roleAssignRouter.put('/assign/put/:emp_id',putRoleAssign);
roleAssignRouter.delete('/assign',deleteRoleAssign);

module.exports = {roleAssignRouter};