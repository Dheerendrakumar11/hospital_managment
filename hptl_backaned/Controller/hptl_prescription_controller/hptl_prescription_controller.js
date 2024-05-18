const connection = require("../../Model/db_connection");

const getPrescription = (req,res)=>{

    const sqlQuery = "SELECT * FROM tbl_hptl_prescription";

    connection.query(sqlQuery,(error,result)=>{

      if(error){
        res.json(error)
      }else{
        res.json(result)
      }
    });
};
const getPrescriptionById = (req,res)=>{
    
    const userDataById  = req.query.patient_id
    const sqlQuery = "SELECT * FROM tbl_hptl_prescription WHERE patient_id = ?";

    connection.query(sqlQuery,userDataById,(error,result)=>{

      if(error){
        res.json(error)
      }else{
        res.json(result)
      }
    });
};
const postPrescription = (req,res)=>{
    
    const userData  = req.body
    const sqlQuery = "INSERT INTO tbl_hptl_prescription SET ?";

    connection.query(sqlQuery,userData,(error,result)=>{

      if(error){
        res.json(error)
      }else{
        res.json(result)
      }
    });
};
const putPrescription = (req,res)=>{
    
    const userDataUpdate  = [req.body,req.query.patient_id]
    const sqlQuery = "UPDATE tbl_hptl_prescription SET ? WHERE patient_id = ?";

    connection.query(sqlQuery,userDataUpdate,(error,result)=>{

      if(error){
        res.json(error)
      }else{
        res.json(result)
      }
    });
};
const deletePrescription = (req,res)=>{
    
    const userDataDelete  = [req.query.patient_id]
    const sqlQuery = "DELETE FROM tbl_hptl_prescription WHERE patient_id = ?";

    connection.query(sqlQuery,userDataDelete,(error,result)=>{

      if(error){
        res.json(error)
      }else{
        res.json(result)
      }
    });
};

module.exports = {getPrescription,getPrescriptionById,postPrescription,putPrescription,deletePrescription};
