const express = require('express');

const testRouter = express.Router();

const {getTest,getTestByid,postTest,putTest,deleteTest} = require('../../Controller/hptl_test_rate_controller/hptl_test_rate_controller');

testRouter.get('/test',getTest);
testRouter.get('/test/byId',getTestByid);
testRouter.post('/test/send',postTest);
testRouter.put('/test/update',putTest);
testRouter.delete('/test/delete',deleteTest);

module.exports = {testRouter};