const express = require('express');

const patientRouter = express.Router();

const {getPatient,getPatientById,postPatient,putPatient,deletePatient,getPatientDAy} = require('../../Controller/hplt_patient_controller/hplt_patient_Controller');

patientRouter.get('/api/patient',getPatient);
patientRouter.get('/api/patient/byid/:patient_id',getPatientById);
patientRouter.get('/api/patient/day',getPatientDAy);
patientRouter.post('/api/patient/send',postPatient);
patientRouter.put('/api/patient/update/:patient_id',putPatient);
patientRouter.delete('/api/patient/delete/:patient_id',deletePatient);

module.exports = {patientRouter};