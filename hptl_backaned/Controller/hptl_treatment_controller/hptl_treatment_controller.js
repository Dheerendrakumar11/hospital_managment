const connection = require('../../Model/db_connection');

const getTreatment = (req,res)=>{

    const sqlQuery = "SELECT * FROM tbl_hptl_treatment";

    connection.query(sqlQuery,(error,result)=>{

        if(error){
            res.json(error)
        }else{
            res.json(result)
        }
    });
};

module.exports = {getTreatment};