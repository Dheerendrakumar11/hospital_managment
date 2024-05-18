const express = require('express');

const prescriptionRouter = express.Router();

const {getPrescription,getPrescriptionById,postPrescription,putPrescription,deletePrescription} = require('../../Controller/hptl_prescription_controller/hptl_prescription_controller');

prescriptionRouter.get('/api/prescription',getPrescription);
prescriptionRouter.get('/api/prescription/byid',getPrescriptionById);
prescriptionRouter.post('/api/prescription/send',postPrescription);
prescriptionRouter.put('/api/prescription/update',putPrescription);
prescriptionRouter.delete('/api/prescription/delete',deletePrescription);


module.exports = {prescriptionRouter,getPrescriptionById,postPrescription,putPrescription,deletePrescription};
