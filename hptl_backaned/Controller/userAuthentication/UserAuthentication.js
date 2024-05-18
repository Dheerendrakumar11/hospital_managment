const connection = require("../../Model/db_connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSignUP = async (req, res) => {
  const { emp_id, emp_name, dept_id, room_no, emp_email, emp_password } =
    req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(emp_password, salt);

  const data = {
    emp_id,
    emp_name,
    dept_id,
    room_no,
    emp_email,
    emp_password: hashedPassword,
  };

  const queryCheckExistence = "SELECT * FROM tbl_hptl_employee WHERE emp_id = ?";
  const queryInsertUser = "INSERT INTO tbl_hptl_employee SET ?";

  connection.query(queryCheckExistence, emp_id, (error, result) => {
    if (error) {
      return res.status(500).json({ Error: error.sqlMessage });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Employee Id already exists" });
    } else {
      connection.query(queryInsertUser, data, (err, result) => {
        if (err) {
          return res.status(500).json({ Error: err.sqlMessage });
        }
        return res
          .status(200)
          .json({ message: "User created successfully", user: data });
      });
    }
  });
};

const loginUser = (req, res) => {
  const { emp_id, emp_password } = req.body;
  const query = "SELECT * FROM tbl_hptl_employee WHERE emp_id = ?";

  connection.query(query, emp_id, async (err, data) => {
    if (err) {
      return res.status(500).json({ Error: "Login" });
    }
    if (data.length === 0) {
      return res.status(404).json({ Error: "User not found" });
    }
    const match = await bcrypt.compare(emp_password, data[0].emp_password);
    if (match) {
      const token = jwt.sign({ emp_id: data[0].emp_id, emp_email: data[0].emp_email }, "your_secret_key", { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ Status: "Success", token });
    } else {
      return res.status(401).json({ Error: "Incorrect password" });
    }
  });
};

module.exports = { userSignUP, loginUser };


// const connection = require("../../Model/db_connection");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

// const { response } = require("express");

// const userSignUP = async (req,res) => {
//   const { emp_id, emp_name, dept_id, room_no, emp_email, emp_password } =
//     req.body;
//   const query = `SELECT * FROM tbl_hptl_employee WHERE emp_id = ?`;
//   const query1 = `INSERT INTO tbl_hptl_employee SET = ?`;
//   const salt = await bcrypt.genSalt(10);
//   const pass = await bcrypt.hash(emp_password, salt);


// const data1 = {
//   emp_id,
//   emp_name,
//   dept_id,
//   room_no,
//   emp_email,
//   emp_password: pass,
// };

// connection.query(query ,emp_id, (error, result) => {
//   if (error) {
//     return response.status(500).send({ Error: error.sqlMessage });
//   }
//   if (result.length) {
//     return response.status(400).send({ message: "Employee Id already exists" });
//   }
//   connection.query(query1, [data1], (err, result) => {
//     if (err) {
//       return res.status(500).send({ Error: err.sqlMessage });
//     }
//     return res
//       .status(200)
//       .send({ message: "User created successfully", user: data1 });
//   });
// });
// };



// const loginUser = async (req, res) => {
//   const sql = "SELECT * FROM tbl_hptl_employee WHERE emp_id = ?";

//   connection.query(sql, [req.body.emp_id], (err, data) => {
//     if (err) {
//       return res.json({ Error: "Login" });
//     }
//     if (data.length > 0) {
//       bcrypt.compare(
//         req.body.emp_password.toString(),
//         data[0].emp_password,
//         (err, response) => {
//           if (err) {
//             return res.json({ Error: "Password Compare error" });
//           }
//           if (response) {
//             const emp_id = data[0].emp_id;
//             const emp_email = data[0].emp_email;

//             const token = jwt.sign({ emp_id, emp_email });
//             res.cookie('token',token)

//             return res.json({ Status: "Success", token });
//           } else {
//             return res.json({ Err: "Password Not Matched" });
//           }
//         }
//       );
//     }else{
//         return res.json({Error : "No user id existed"})
//     }
//   });
// };


// module.exports = {userSignUP,loginUser}