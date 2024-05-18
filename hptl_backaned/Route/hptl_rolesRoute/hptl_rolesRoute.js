const express = require('express');

const rolesRouter = express.Router();

const {getRoles,getRolesbyId,postRoles,putRoles,deleteRoles} = require('../../Controller/hptl_rolesController/rolesController');

rolesRouter.get('/api/roles',getRoles);
rolesRouter.get('/api/get/roles/:role_id',getRolesbyId);
rolesRouter.post('/api/post/roles',postRoles);
rolesRouter.put('/api/roles',putRoles);
rolesRouter.delete('/api/delete/roles/:role_id',deleteRoles);



module.exports = {rolesRouter};