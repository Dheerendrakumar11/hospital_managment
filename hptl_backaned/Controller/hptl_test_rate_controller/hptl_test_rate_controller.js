const connection = require('../../Model/db_connection');

const getTest = (req,res)=>{
    const sqlQuery = "SELECT * FROM tbl_hptl_test_rate";

    connection.query(sqlQuery,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        };
    });
};
const getTestByid = (req,res)=>{
    const getDataById = req.query.test_id;
    const sqlQuery = "SELECT * FROM tbl_hptl_test_rate WHERE test_id = ?";

    connection.query(sqlQuery,getDataById,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        };
    });
};
const postTest = (req,res)=>{

    const testData = req.body 
    const sqlQuery = "INSERT INTO tbl_hptl_test_rate SET = ?";

    connection.query(sqlQuery,testData,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        };
    });
};
const putTest = (req,res)=>{

    const updateTestData = req.query.test_id 
    const sqlQuery = "UPDATE tbl_hptl_test_rate SET ? WHERE test_id = ?";

    connection.query(sqlQuery,updateTestData,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        };
    });
};
const deleteTest = (req,res)=>{

    const deleteTestData = req.query.test_id 
    const sqlQuery = "DELETE FROM tbl_hptl_test_rate WHERE test_id = ?";

    connection.query(sqlQuery,deleteTestData,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        };
    });
};

module.exports = {getTest,getTestByid,postTest,putTest,deleteTest};