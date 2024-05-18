const connection = require('../../Model/db_connection');

const getLabs = (req,res)=>{

    const sqlQuery = "SELECT * FROM tbl_hptl_labs";

    connection.query(sqlQuery,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}
const getLabsById = (req,res)=>{
    
    const getDataById = req.query.lab_id
    const sqlQuery = "SELECT * FROM tbl_hptl_labs WHERE lab_id = ?";

    connection.query(sqlQuery,getDataById,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

const postLabs = (req,res)=>{

    const userData = req.body;
    const sqlQuery ="INSERT INTO tbl_hptl_labs SET = ?";

    connection.query(sqlQuery,userData,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

const putLabs = (req,res)=>{

    const updateData = [req.body,req.query.lab_id];
    const sqlQuery = "UPDATE tbl_hptl_labs SET ? WHERE lab_id = ?";

    connection.query(sqlQuery,updateData,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

const deleteLabs = (req,res)=>{
    const deleteLabData = req.query.lab_id;
    const sqlQuery = "DELETE FROM tbl_hptl_labs WHERE lab_id = ?";
    
    connection.query(sqlQuery.deleteLabData,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result)
        }
    })
} 
module.exports = {getLabs,getLabsById,postLabs,putLabs,deleteLabs}