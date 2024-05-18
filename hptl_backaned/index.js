const express = require("express");
const dotenv = require("dotenv");
const hospital = express();
const cors = require("cors");
hospital.use(express.json());
hospital.use(cors());

dotenv.config();

const port = process.env.PORT;

const { hptl_roomRouter } = require("./Route/hptl_roomRoute/hptl_roomRoute");
hospital.use("/", hptl_roomRouter);

const { departmentRouter } = require("./Route/departmentRoute/departmentRote");
hospital.use("/", departmentRouter);

const {tbl_hptl_employeeRouter} = require("./Route/tbl_hptl_employeeRoute/tbl_hptl_employeeRoute");
hospital.use("/", tbl_hptl_employeeRouter);

const { profileRouter } = require("./Route/emp_profileRoute/emp_profileRoute");
hospital.use("/", profileRouter);

const {rolesRouter} = require('./Route/hptl_rolesRoute/hptl_rolesRoute');
hospital.use('/',rolesRouter);

const {roleAssignRouter} = require('./Route/hptl_role_assignRoute/hptl_role_assignRoute')
hospital.use('/',roleAssignRouter)

const {labsRouter} = require('./Route/tbl_hptl_labsRoute/tbl_hptl_labsRoute');
hospital.use('/',labsRouter);


const {testRouter} = require('./Route/hptl_test_rateRoute/_hptl_test_rateRoute')
hospital.use('/',testRouter)

const {patientRouter} = require('./Route/hplt_patientRouter/hplt_patientRouter');
hospital.use('/',patientRouter)

const {treatmentRoutrer} = require('./Route/hptl_treatmentRouter/hptl_treatmentRouter');
hospital.use('/',treatmentRoutrer)

const {prescriptionRouter} = require('./Route/hptl_prescriptionRouter/hptl_prescriptionRouter');
hospital.use(prescriptionRouter);

const {multerRoute} = require('./Route/multerRoute/multer')
hospital.use(multerRoute)


const {AuthRouter} = require('./Route/empAuthentication/empAuth')
hospital.use(AuthRouter)

hospital.listen(port,() => {
  console.log(`server is running on http://localhost:${port}`);
});
