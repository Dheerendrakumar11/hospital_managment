import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row, Modal, Card, Button, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever, MdGroups} from "react-icons/md";
import { FaUserNurse, FaUserDoctor } from "react-icons/fa6";
import { LuView } from "react-icons/lu";

function EmployeeList() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //////////////////////////put////////////////////////

  const [dataId, setDataId] = useState({});
  const [empId, setEmpId] = useState();
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true); // Corrected setShow to setShow1
    setDataId({}); // Corrected setDataId to an empty object
  };

  ///////////////////////////////////////view///////////////////////////////////
  const [show3, setShow3] = useState(false);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  //////////////////role Assign get Api////////////////////////

  const [role, setRole] = useState([]);

  const fatchRoleData = async () => {
    try {
      const response = await axios.get("http://localhost:8010/api/roles");
      console.log(response);
      setRole(response.data);
    } catch (error) {
      console.log(`Error fatching role name${error}`);
    }
  };
  useEffect(() => {
    fatchRoleData();
  }, []);
  /////////////////////////Post Assign//////////////////////////////

  const handleUpdateRole = async (e, row) => {
    // e.preventDefault();
    console.log(row, e.target.value);
    try {
      if (e.target.value) {
        // Construct the roleChange object with role_id and emp_id
        const roleChangeData = {
          role_id: e.target.value, // Assuming e.target.value contains the role_id
          emp_id: row, // Assuming row.emp_id contains the employee's ID
        };

        const response = await axios.post(
          "http://localhost:8010/assign/post",
          roleChangeData // Pass roleChangeData instead of roleChange directly
        );
        fetchRoleAss();
        console.log(response.data);
        // fatchRoleData();
      }
    } catch (error) {
      console.log(error, "Error not posting data");
    }
  };

  // const getByIdata = async(empId)=>{
  //   const responce = await axios.get(`http://localhost/assign/get/${empId}`);

  //   console.log(responce.data,"responce")
  //   setRoleId(responce.data)

  // }

  ///////////////////////////////////table////////////////////

  const columns = [
    // {
    //     name:"Sno",
    //     selector: (row) => row.++Sno,
    // },
    {
      name: "EmpID",
      selector: (row) => row.emp_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.emp_name,
      sortable: true,
    },
    {
      name: "Role",
      sortable: true,
      cell: (row) => {
        // Initialize an array to store role names for the current row
        const roleNames = [];

        // Iterate through the roleAssign array to find matching roles for the current row
        roleAssign.forEach((item) => {
          if (row.emp_id === item.emp_id) {
            // Push the role name to the roleNames array
            roleNames.push(item.role_name);
          }
        });

        // Render the role names separately
        return (
          <>
            {roleNames.map((role, index) => (
              <span key={index}>
                {role}
                {/* Add comma and space if it's not the last role */}
                {index !== roleNames.length - 1 && ",  "}
              </span>
            ))}
          </>
        );
      },
    },
    {
      name: "Role Assign",
      selector: (row) => row.role_name,
      cell: (row) => {
        return (
          <>
            <Form.Select
              aria-label="Default select example"
              id="roleName"
              name="role_name"
              // defaultValue={roleId?.emp_id}
              value={role.emp_id}
              onChange={(e) => handleUpdateRole(e, row.emp_id)}
              // onClick={()=>{getByIdata(row.emp_id,)}}
            >
              <option>Select</option>
              {role.map((roleName, index) => (
                <option name="role_name" value={roleName.role_id} key={index}>
                  {roleName.role_name}
                </option>
              ))}
            </Form.Select>
          </>
        );
      },
    },

    {
      name: "Room No",
      selector: (row) => row.room_no,
      sortable: true,
    },
    {
      name: "Dept Name",
      selector: (row) => row.dept_name,
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.emp_email,
      sortable: true,
    },
    // {
    //   name: "Password",
    //   selector: (row) => row.emp_password,
    //   sortable:true

    // },
    {
      name: "Action",
      cell: (row) => {
        return (
          // <Container className="me-3">
          <Row>
            <Col>
              <LuView
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor: "",
                  color: "gray",
                  borderRadius: "3px",
                }}
                onClick={() => {
                  handleShow3();
                  setEmpId(row?.emp_id);
                  getDataById(row?.emp_id);
                }}
              />
            </Col>

            <Col>
              <AiFillEdit
                onClick={() => {
                  update1(
                    row.emp_id,
                    row.emp_name,
                    row.dept_id,
                    row.room_no,
                    row.emp_email,
                    row.password
                  );
                  setEmpId(row.emp_id);
                  getDataById(row.emp_id);
                }}
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor: "#198754",
                  color: "white",
                  borderRadius: "3px",
                }}
              />
            </Col>
            <Col>
              <MdDeleteForever
                onClick={() => {
                  handleDelete(row.emp_id);
                }}
                style={{
                  height: "25px",
                  width: "25px",
                  backgroundColor: "#DC3545",
                  color: "white",
                  borderRadius: "3px",
                }}
              />
            </Col>
          </Row>
          // </Container>
        );
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#26A59A",
        fontSize: "15px",
        fontWeight: "600",
        color: "white",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };
  /////////////////////get roll//

  ///////////////////////get/////////////////////////////////
  const getData = () => {
    axios
      .get(`http://localhost:8010/employee/get`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setFilterData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  ///////////////////////filter data///////////////////////////////

  const hanlefilter = (event) => {
    const newData = filterData.filter((row) =>
      row.emp_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setData(newData);
  };
  ////////////////////////post Api/////////////////////////////////

  const [add, setAdd] = useState({
    emp_id: "",
    emp_name: "",
    dept_id: "",
    room_no: "",
    emp_email: "",
    emp_password: "",
  });

  const handleChange = (e) => {
    setAdd({ ...add, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:8010/employee/post`, add)
      .then((res) => {
        console.log(res);
        getData();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  ////////////////PUT API//////////////////////////////////

  const [update, setUpdate] = useState({
    emp_id: "",
    emp_name: "",
    dept_id: "",
    room_no: "",
    emp_email: "",
    emp_password: "",
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:8010/employee/put/${empId}`, update)
      .then((res) => {
        console.log("resuntreeee", res);
        if (res.data.Status) {
          getData();
          handleClose1();
        } else {
          getData();
          handleClose1();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDataById = (empId) => {
    axios
      .get(`http://localhost:8010/employee/getbyid/${empId}`)
      .then((res) => {
        console.log(res, "hasss");
        setDataId(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  function update1(id, name, depid, roomno, email, password) {
    setUpdate({
      ...update,
      emp_id: id,
      emp_name: name,
      dept_id: depid,
      room_no: roomno,
      emp_email: email,
      emp_password: password,
    });
    handleShow1();
  }

  //////////////////////////////////////delete///////////////////////////

  const handleDelete = (Id) => {
    axios
      .delete(`http://localhost:8010/employee/delete/${Id}`)
      .then((result) => {
        console.log(result);
        getData();
      });
  };
  ////////////////////////////////getRoom/////////////////////////////////

  const [roomNumbers, setRoomNumbers] = useState([]);

  useEffect(() => {
    fetchRoomNumbers();
  }, []);

  const fetchRoomNumbers = async () => {
    try {
      const response = await axios.get("http://localhost:8010/room"); // Adjust endpoint as per your backend setup
      setRoomNumbers(response.data);
    } catch (error) {
      console.error("Error fetching room numbers:", error);
    }
  };
  //////////////////////////////////////////////getDepaName///////////////////////////////

  const [deptName, setdeptName] = useState([]);

  const fetchDeptName = async () => {
    try {
      const response = await axios.get("http://localhost:8010/department/get");
      setdeptName(response.data);
    } catch (error) {
      console.error("Error fetching dept name", error);
    }
  };

  useEffect(() => {
    fetchDeptName();
  }, []);
  //////////////////////////////roleAssign//////////////////////////////////////
  const [roleAssign, setRoleAssign] = useState([]);

  const fetchRoleAss = async () => {
    try {
      const response = await axios.get("http://localhost:8010/api/assign");
      setRoleAssign(response.data);
    } catch (error) {
      console.error("Error fetching dept name", error);
    }
  };

  useEffect(() => {
    fetchRoleAss();
  }, []);

  ////////////////////////////////////////////////empProfile/////////////////////////////////////////////////
  const [empProf, setEmpProf] = useState([]);

  const fetchEmpprof = async () => {
    try {
      const response = await axios.get("http://localhost:8010/profile/get");
      setEmpProf(response.data);
    } catch (error) {
      console.error("Error fetching dept name", error);
    }
  };

  useEffect(() => {
    fetchEmpprof();
  }, []);

  return (
    <>
      <div>
        <Container
          className="d-flex gap-5 d-flex justify-content-center align-item-center"
          style={{ flexWrap: "Wrap" }}
        >
          <Card
            style={{
              width: "15rem",
              height: "8rem",
              boxShadow: "0px 0px 10px 0px #26A59A",
            }}
          >
            <Card.Body>
              <Container>
                <Row>
                  <Col className="col-8 d-flex justify-content-center align-item-center text-start">
                    <div className="float-bottum bt-5">
                      <h2
                        style={{ color: "#26A59A" }}
                        className="text-lowercase"
                      >
                        123
                      </h2>
                      <p style={{ color: "#265073" }} className="pt-3">
                        Total Employee
                      </p>
                    </div>
                  </Col>
                  <Col className="col-4 pb-1">
                    <MdGroups
                      className="float-end"
                      style={{
                        height: "6rem",
                        width: "4rem",
                        color: "#26A59A",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <Card
            className=""
            style={{
              width: "15rem",
              height: "8rem",
              boxShadow: "0px 0px 15px 0px #28B6F6",
            }}
          >
            <Card.Body>
              <Container>
                <Row>
                  <Col className="col-8 d-flex justify-content-center align-item-center text-start">
                    <div className=" bt-5">
                      <h2
                        style={{ color: "#26A59A" }}
                        className="text-lowercase"
                      >
                        13
                      </h2>
                      <p className="pt-3" style={{ color: "#265073" }}>
                        Total Doctor{" "}
                      </p>
                    </div>
                  </Col>
                  <Col className="col-4  ">
                    <FaUserDoctor
                      className="float-end mt-4"
                      style={{
                        height: "3rem",
                        width: "4rem",
                        color: "#26A59A",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "15rem",
              height: "8rem",
              boxShadow: "0px 0px 15px 0px #28B6F6",
            }}
          >
            <Card.Body>
              <Container>
                <Row>
                  <Col className="col-8 d-flex justify-content-center align-item-center text-start">
                    <div className="float-bottum bt-5">
                      <h2
                        style={{ color: "#26A59A" }}
                        className="text-lowercase"
                      >
                        50
                      </h2>
                      <p className="pt-3" style={{ color: "#265073" }}>
                        Total Nurse{" "}
                      </p>
                    </div>
                  </Col>
                  <Col className="col-4 ">
                    <FaUserNurse
                      className="float-end mt-3"
                      style={{
                        height: "3.5rem",
                        width: "4rem",
                        color: "#26A59A",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <Card
            style={{
              width: "15rem",
              height: "8rem",
              boxShadow: "0px 0px 15px 0px #28B6F6",
            }}
          >
            <Card.Body>
              <Container>
                <Row>
                  <Col className="col-8 d-flex justify-content-center align-item-center text-start">
                    <div className="float-bottum bt-5">
                      <h2
                        style={{ color: "#26A59A" }}
                        className="text-lowercase"
                      >
                        123
                      </h2>
                      <p style={{ color: "#265073" }} className="pt-3">
                        Total Employee
                      </p>
                    </div>
                  </Col>
                  <Col className="col-4 ">
                    <MdGroups
                      className="float-end"
                      style={{
                        height: "5rem",
                        width: "4rem",
                        color: "#26A59A",
                        borderRadius: "5px",
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Container>
        <Container className="mt-5">
          <Row>
            <Col>
              {" "}
              <Button variant="primary" onClick={handleShow} className="mb-3">
                Add Employee
              </Button>
            </Col>
            <Col className="col-2 float-end mb-3">
              <Form.Control
                type="text"
                placeholder="Search....."
                onChange={hanlefilter}
              />
            </Col>
          </Row>

          <Modal show={show} onHide={handleClose} className="m-5">
            <Modal.Header
              closeButton
              style={{
                backgroundColor: "#26A59A",
                borderRadius: "",
                borderStyle: "none",
              }}
            >
              <Modal.Title style={{ color: "white" }}>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ border: "3px #26A59A" }}>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <Form.Label>Emp ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_id"
                      value={add.emp_id}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Emp Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_name"
                      value={add.emp_name}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label>Dept Id</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="dept_id"
                      value={add.dept_id}
                      onChange={handleChange}
                    /> */}
                    <Form.Select
                      aria-label="Default select example"
                      name="dept_id"
                      value={add.dept_id}
                      onChange={handleChange}
                    >
                      {deptName.map((deptName, index) => (
                        <option name="dept_id" key={index}>
                          {deptName.dept_id}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Room no</Form.Label>
                    {/* <Form.Control
                      type="text"
                      name="room_no"
                      value={add.room_no}
                      onChange={handleChange}
                    /> */}
                    <Form.Select
                      aria-label="Default select example"
                      id="roomNumber"
                      name="room_no"
                      value={add.room_no}
                      onChange={handleChange}
                    >
                      {roomNumbers.map((roomNumber, index) => (
                        <option name="room_no" key={index}>
                          {roomNumber.room_no}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_email"
                      value={add.emp_email}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_password"
                      value={add.emp_password}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Modal.Footer className="mt-4">
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose} type="submit">
                    ADD
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>

          <DataTable
            columns={columns}
            data={data}
            // data1={data1}
            customStyles={customStyles}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="510px"
            selectableRowsHighlight
            highlightOnHover
          />
          {/* ////////////////////update modle//////////////////// */}
          <Modal show={show1} onHide={handleClose1} className="m-5">
            <Modal.Header
              closeButton
              style={{
                backgroundColor: "#26A59A",
                borderRadius: "",
                borderStyle: "none",
              }}
            >
              <Modal.Title style={{ color: "white" }}>
                Update Employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleUpdate}>
                <Row>
                  <Col>
                    <Form.Label>Emp ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_id"
                      value={update.emp_id}
                      defaultValue={dataId?.emp_id}
                      onChange={(e) => setEmpId(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Emp Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_name"
                      value={update.emp_name}
                      defaultValue={dataId?.emp_name}
                      onChange={(e) =>
                        setUpdate({ ...update, emp_name: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label>Dept Id</Form.Label>

                    <Form.Select
                      aria-label="Default select example"
                      name="dept_name"
                      defaultValue={dataId?.dept_name}
                      value={update.dept_name}
                      onChange={(e) =>
                        setUpdate({ ...update, dept_name: e.target.value })
                      }
                    >
                      <option>Select</option>
                      {deptName.map((deptName, index) => (
                        <option name="dept_name" key={index}>
                          {deptName.dept_name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form.Label>Room no</Form.Label>
                    {/* <Form.Control
                  type="text"
                  name="room_no"
                  value={update.room_no}
                  defaultValue={dataId?.room_no}
                  onChange={(e) => setUpdate({ ...update, room_no: e.target.value })}
                /> */}

                    <Form.Select
                      aria-label="Default select example"
                      id="roomNumber"
                      name="room_no"
                      value={update.room_no}
                      defaultValue={dataId?.room_no}
                      onChange={(e) =>
                        setUpdate({ ...update, room_no: e.target.value })
                      }
                    >
                      <option>Select</option>
                      {roomNumbers.map((roomNumber, index) => (
                        <option name="room_no" key={index}>
                          {roomNumber.room_no}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="emp_email"
                      value={update.emp_email}
                      defaultValue={dataId?.emp_email}
                      onChange={(e) =>
                        setUpdate({ ...update, emp_email: e.target.value })
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="emp_password"
                      value={update.emp_password}
                      defaultValue={dataId?.emp_password}
                      onChange={(e) =>
                        setUpdate({ ...update, emp_password: e.target.value })
                      }
                    />
                  </Col>
                </Row>
                <Modal.Footer className="mt-4">
                  <Button variant="secondary" onClick={handleClose1}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    UPDATE
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
          {/* //////////////////////////////////////////////view model//////////////////////////////////////////// */}

          <Modal show={show3} onHide={handleClose3} className="m-5 lg">
            <Modal.Header closeButton>
              <h3>User Profile</h3>
            </Modal.Header>
            <Modal.Body>
              <section>
                <div className="container">
                  <div className="row">
                    <div className="col-lg">
                      <div className="card mb-4">
                        <div className="card-body">
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Full Name</p>
                            </div>
                            <div class="col-sm-9">Name</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Date of Birth</p>
                            </div>
                            <div class="col-sm-9">DOJ</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Qualification</p>
                            </div>
                            <div class="col-sm-9">Qualification</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Gender</p>
                            </div>
                            <div class="col-sm-9">gender</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">mobile</p>
                            </div>
                            <div class="col-sm-9">mobile</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Email</p>
                            </div>
                            <div class="col-sm-9">email</div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <p class="mb-0">Address</p>
                            </div>
                            <div class="col-sm-9">address</div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Modal.Body>
            {empProf ? (
              <div>
                {/* <p>Employee ID: {employeeData.emp_id}</p> */}
                <p>Name: {empProf.emp_name}</p>
                <p>Email: {empProf.emp_email}</p>
                {/* Render other employee profile fields as needed */}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Modal>
        </Container>
      </div>
    </>
  );
}

export default EmployeeList;
