const connection = require("../../Model/db_connection");

const getTbl_hptl_employee = (req, res) => {
  const sqlQurey = "select * from Tbl_hptl_employee";

  connection.query(sqlQurey, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

// const getTbl_hptl_employee_byid = (req, res) => {
//   const id = req.parmas.emp_id;
//   const sqlQurey = "select * from Tbl_hptl_employee where emp_id = ?";

//   connection.query(sqlQurey, [id], (error, result) => {
//     if (error) {
//       res.json(error);
//     } else {
//       res.json(result);
//     }
//   });
// };
const getTbl_hptl_employee_byid = (req, res) => {
  const id = req.params.emp_id; // Corrected from req.parmas.emp_id to req.params.emp_id
  const sqlQuery = "SELECT * FROM Tbl_hptl_employee WHERE emp_id = ?"; // Corrected sqlQurey to sqlQuery

  connection.query(sqlQuery, [id], (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

const postTbl_hptl_employee = (req, res) => {
  const employeeData = req.body;
  console.log(employeeData);
  const sqlQurey = "INSERT INTO Tbl_hptl_employee SET ?";

  connection.query(sqlQurey, employeeData, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

const putTbl_hptl_employee = (req, res) => {
    const data = req.body;
    console.log(data)
    const emp_id = req.params.emp_id
  const sqlQurey = "UPDATE Tbl_hptl_employee SET ? WHERE emp_id = ?";

  connection.query(sqlQurey, [data, emp_id], (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};
const deleteTbl_hptl_employee = (req, res) => {
  const emp_change = req.params.emp_id;
  const sqlQurey = "DELETE FROM Tbl_hptl_employee WHERE emp_id = ?";

  connection.query(sqlQurey, emp_change, (error, result) => {
    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getTbl_hptl_employee,
  getTbl_hptl_employee_byid,
  postTbl_hptl_employee,
  putTbl_hptl_employee,
  deleteTbl_hptl_employee,
};
