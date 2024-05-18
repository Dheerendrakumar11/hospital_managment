const connection = require("../../Model/db_connection");

const getDepartment = (req, res) => {
  const sqlQuery = "SELECT * FROM tbl_hptl_department";

  connection.query(sqlQuery, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};
const getDepartmentId = (req, res) => {
  const data = req.params.dept_id;
  const sqlQuery = "SELECT * FROM tbl_hptl_department WHERE dept_id = ?";

  connection.query(sqlQuery, data, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
      // console.log(result)
    }
  });
};

const postDepartment = (req, res) => {
  const deptData = req.body;

  const sqlQuery = "INSERT INTO tbl_hptl_department SET ?";
  
  connection.query(sqlQuery,deptData, (error, result) => {
    if (error) {
      res.json(error,"error");
    } else {
      res.json(result);
      
    }
  });
};

const putDepartment = (req, res) => {
  const deptUpdate = [req.body, req.params.dept_id];
  console.log(deptUpdate)
  const sqlQuery = "UPDATE tbl_hptl_department SET ? WHERE dept_id = ?";

  connection.query(sqlQuery, deptUpdate, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

const deleteDepartment = (req, res) => {
  const deleteData = [req.params.dept_id];
   const sqlQuery = "DELETE FROM tbl_hptl_department WHERE dept_id = ?";

   connection.query(sqlQuery,deleteData,(error,result)=>{

    if(error){
        res.json(error);
    }else{
        res.json(result);
    }
   })
};
module.exports = {
  getDepartment,
  getDepartmentId,
  postDepartment,
  putDepartment,
  deleteDepartment
};
