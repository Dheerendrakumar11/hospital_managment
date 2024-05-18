const express = require('express');

const treatmentRoutrer = express.Router();

const {getTreatment} = require('../../Controller/hptl_treatment_controller/hptl_treatment_controller');

treatmentRoutrer.get('/treatment',getTreatment);

module.exports = {treatmentRoutrer};