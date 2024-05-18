const express = require('express');

const labsRouter = express.Router();

const {getLabs,getLabsById,postLabs,putLabs,deleteLabs} = require('../../Controller/hptl_labs_controller/hptl_labs_controller');

labsRouter.get('/api/labs',getLabs);
labsRouter.get('/api/labs',getLabsById);
labsRouter.post('/api/labs',postLabs);
labsRouter.put('/api/labs',putLabs);
labsRouter.delete('/api/labs',deleteLabs);

module.exports = {labsRouter};
