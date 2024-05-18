const connection = require('../../Model/db_connection');

const getRoleAssign = (req,res)=>{

     const sqlQuery = "SELECT e.emp_id, r.role_name FROM tbl_hptl_employee e INNER JOIN tbl_hptl_role_assign ra ON e.emp_id = ra.emp_id INNER JOIN tbl_hptl_roles r ON ra.role_id = r.role_id;";
     
     connection.query(sqlQuery,(error,result)=>{
       
       if(error){
          res.json(error);
       }
       else{
          res.json(result);
           }
     })
}

const getRoleAssignById = (req, res) => {
     const sqlQuery = "const getDataById = req.params.e_MP";
     const getDataById = [req.params.emp_id]; // Assuming emp_id is a URL parameter

     connection.query(sqlQuery, getDataById, (error, result) => {
          if (error) {
               res.status(500).json({ error: "Error fetching data" });
          } else {
               res.json(result);
          }
     });
};

const postRoleAsssign = (req,res)=>{
     
     const userData = req.body;
     const sqlQuery = "INSERT INTO tbl_hptl_role_assign SET ?";

     connection.query(sqlQuery,userData,(error,result)=>{

          if(error){
               res.json(error);
          }
          else{
               res.json(result);
          }
     })
}

const putRoleAssign =(req, res) => {
     const { emp_id, role_id } = [req.params.body,req.body];
     
     const sql = 'UPDATE tbl_hptl_role_assign SET role_id = ? WHERE emp_id = ?';
     connection.query(sql, [role_id, emp_id], (err, result) => {
       if (err) {
         console.error(err);
         return res.status(500).json({ message: 'Internal server error' });
       }
       return res.status(200).json({ message: 'Role assigned successfully' });
     });
   }

const deleteRoleAssign = (req,res)=>{

     const userDelete = [req.query.role_id];
     const sqlQuery = "DELETE FROM  tbl_hptl_role_assign WHERE role_id = ?";

     connection.query(sqlQuery,userDelete,(error,result)=>{

          if(error){
               res.json(error);
          }
          else{
               res.json(result)
          }
     })

}

module.exports = {getRoleAssign,getRoleAssignById,postRoleAsssign,putRoleAssign,deleteRoleAssign};