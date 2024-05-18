const connection = require("../../Model/db_connection");

const getPatient = (req, res) => {
  const sqlQuery = "SELECT * FROM tbl_hplt_patient";

  connection.query(sqlQuery, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};
const getPatientDAy = (req, res) => {
  const sqlQuery = "SELECT  COUNT(*) AS 'Total' FROM tbl_hplt_patient WHERE day(date) = CURDATE();";
  // const sqlQuery1 = "SELECT MONTH(date), COUNT(*) FROM tbl_hplt_patient GROUP BY MONTH(date)";
  // const sqlQuery2 = "SELECT YEAR(date), COUNT(*) FROM tbl_hplt_patient GROUP BY YEAR(date)";
  // const sqlQuery = "SELECT * FROM tbl_hplt_patient";
 console.log(sqlQuery)
  connection.query(sqlQuery, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

const getPatientById = (req, res) => {
  const userDataById = req.params.patient_id;
  const sqlQuery = `SELECT * FROM tbl_hplt_patient WHERE patient_id = ?`;
   
  connection.query(sqlQuery, userDataById, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result[0]);
    }
  });
};
const postPatient = (req, res) => { 
  const userDataSend = req.body;
  const data = {
    patient_id: req.body.patient_id,
    P_name: req.body.P_name,
    gender: req.body.gender,
    age: req.body.age,
    mobile: req.body.mobile,
    symptoms: req.body.symptoms,
    city: req.body.city,
    date: req.body.data,
    time: req.body.time,
  };
  // console.log(data);

  // const sqlQuery = "INSERT INTO tbl_hplt_patient (patient_id,P_name,gender,age,mobile,symptoms,city,date,time) values(?,?,?,?,?,?,?,?,?)";
  const sqlQuery = "INSERT INTO tbl_hplt_patient SET ?";

  connection.query(sqlQuery, data, (error, result) => {
    if (error) {
      console.log(error);
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

const putPatient = (req, res) => {
  const userDataUpdate = [req.body, req.params.patient_id];
  const sqlQuery = "UPDATE tbl_hplt_patient SET ? WHERE patient_id = ?";

  connection.query(sqlQuery, userDataUpdate, (error, result) => {
    if (error) {
      res.json('error',error);
    } else {
      res.json(result);
    }
  });
};

const deletePatient = (req, res) => {
  const userDelete = req.params.patient_id;
  const sqlQuery = "DELETE FROM tbl_hplt_patient WHERE patient_id = ?";

  connection.query(sqlQuery, userDelete, (error, result) => {
    if (error) {
      res.json(error);
    }
    res.json(result);
  });
};

module.exports = {
  getPatient,
  getPatientById,
  postPatient,
  putPatient,
  deletePatient,
  getPatientDAy
};
