const connection = require('../../Model/db_connection');

const getProfile = (req,res)=>{

    const sqlQuery = 'SELECT * FROM  tbl_hptl_emp_profile';
    
    connection.query(sqlQuery,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        }
    })
}

const getProfilebyId = (req,res)=>{

    const profileData = req.query.emp_id;

    const sqlQuery = "SELECT * FROM tbl_hptl_emp_profile WHERE emp_id = ?";

    connection.query(sqlQuery,profileData,(error,result)=>{


    })
} 

const postProfile = (req,res)=>{
    const userData = {
        emp_id:req.body.emp_id, 
        emp_name:req.body.emp_name, 
        DOB:req.body.DOB, 
        qualification:req.body.qualification, 
        gender:req.body.gender, 
        mobile:req.body.mobile, 
        email:req.body.email, 
        address:req.body.address, 
        image:req.file.location, 
    }
    const sqlQuery = "INSERT INTO tbl_hptl_emp_profile SET ?";

    connection.query(sqlQuery,userData,(error,result)=>{
        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

const putProfile = (req,res)=>{
    const updateData = [req.body,req.query.emp_id];
    const sqlQuery = 'UPDATE TABLE tbl_hptl_emp_profile SET ? WHERE emp_id';

    connection.query(sqlQuery,updateData,(error,result)=>{
        
        if(error){
            res.json(error)
        }
        else{

        }

    })
}

const deleteProfile = (req,res)=>{

    const deleteData = req.query.emp_id;
    const sqlQuery = 'DELETE FROM tbl_hptl_emp_profile WHERE emp_id = ?';

    connection.query(sqlQuery,deleteData,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}
module.exports={getProfile,getProfilebyId,postProfile,putProfile,deleteProfile}