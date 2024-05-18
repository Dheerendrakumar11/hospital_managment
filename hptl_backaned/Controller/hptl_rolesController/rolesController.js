const connection = require('../../Model/db_connection');

const getRoles = (req,res)=>{

    const sqlQuery = "SELECT * FROM tbl_hptl_roles";

    connection.query(sqlQuery,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        }
    })
}

const getRolesbyId = (req,res)=>{

    const getDataById = req.params.role_id;
    const sqlQuery = 'SELECT * FROM tbl_hptl_roles WHERE role_id = ?';
    
    connection.query(sqlQuery,getDataById,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

const postRoles = (req,res)=>{

    const rolesData = req.body;
    const sqlQuery = "INSERT INTO tbl_hptl_roles SET ?";

    connection.query(sqlQuery,rolesData,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

const putRoles = (req,res)=>{

    const rolesUpdate = [req.body,req.query.roles_id];
    const sqlQuery = "UPTADE tbl_hptl_roles SET ? WHERE role_id = ?";

    connection.query(sqlQuery,rolesUpdate,(error,result)=>{

        if(error){
            res.json(error);
        }
        else{
            res.json(result);
        }
    })
}

const deleteRoles = (req,res)=>{

    const rolesDelete = req.params.role_id;
    const sqlQuery = "DELETE FROM tbl_hptl_roles WHERE role_id = ?";
    
    connection.query(sqlQuery,rolesDelete,(error,result)=>{

        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    })
}

module.exports = {getRoles,getRolesbyId,postRoles,putRoles,deleteRoles}