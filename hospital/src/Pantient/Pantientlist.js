import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";

const Pantientlist = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const updateClose = () => {
    setShow1(false);
    setpatientDataId("");
  };

  const updateShow = () => setShow1(true);

  
  const getData = async () => {
    const apiURL = "http://localhost:8010/api/patient";
    await axios
      .get(apiURL)
      .then((result) => {
        console.log(result.data, "result");
        setData(result.data);
        setFilterData(result.data)
      })
      .catch((error) => {
        console.log(error,"error");
      });
  };
  useEffect(() => {
    getData();
  }, []);

  //////post Api///////////////////////
  const [patient, setPatient] = useState({
    patient_id: "",
    P_name: "",
    gender: "",
    age: "",
    mobile: "",
    symptoms: "",
    city: "",
    date: "",
    time: "",
  });

  const handleChange = (event) => {
    setPatient({
      ...patient,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(patient);
    fetch("http://localhost:8010/api/patient/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data saved successfully:", data);
        getData();
        handleClose();
        // fetchUsers();
        // handleClose();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  //////////////put/////////////////////////////////////////

  const [update, setUpdate] = useState({
    P_name: "",
    gender: "",
    age: "",
    mobile: "",
    symptoms: "",
    city: "",
    date: "",
    time: "",
  });

  const [patientId, setPatientId] = useState({});
  const [patientDataId, setpatientDataId] = useState();
  console.log(patientDataId, "patientDataId");
  const updateSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8010/api/patient/update/${patientDataId}`, update)
      .then((result) => {
        console.log(result, "result in patientResult");

        if (result.data.Status) {
          getData();
          updateClose();
        } else {
          setpatientDataId("");
          getData();
          updateClose();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataById = async (patienID) => {
    const response = await axios.get(
      `http://localhost:8010/api/patient/byid/${patienID}`
    );

    console.log(response, "response");
    setPatientId(response.data);
  };
/////////////////////Delete///////////////////////////////////////////

const deleteData = async (id) => {
  const apiURL = `http://localhost:8010/api/patient/delete/${id}`;
  await axios
    .delete(apiURL)
    .then(() => {
      getData()
   

    })
    .catch((error) => {
      console.log("error");
    });
};


////////////////////filter////////////////////////////////////////////

const hanlefilter = (event)=>{
  const newData = filterData.filter(row=>
    row.P_name.toLowerCase().includes(event.target.value.toLowerCase())
  )
  setData(newData)
  
}


////////////////////////////////////////////////////////////////////////
  const columns = [
    {
      name: "Patient_id",
      selector: (row) => row.patient_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.P_name,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Symptoms",
      selector: (row) => row.symptoms,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      format: (row) => moment(row.date).format('DD-MM-YYYY')
    },
    
    {
      name: "time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "city",
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => {
        return (
          <Row>
            <Col>
              <BorderColorIcon
                className="secondary"
                style={{
                  backgroundColor: "#198754",
                  height: "30px",
                  width: "35px",
                  borderRadius: "5px",
                  color: "white",
                }}
                onClick={() => {
                  getDataById(row.patient_id);
                  updateShow();
                  setpatientDataId(row.patient_id)
                }}
              />

        
            </Col>
            <Col>
              <DeleteIcon
                style={{
                  backgroundColor: "#FE0000",
                  height: "30px",
                  width: "35px",
                  borderRadius: "5px",
                  color: "white",
                }}
                onClick={()=>{
                  deleteData(row.patient_id)
                }}
              />
            </Col>
          </Row>
     
        );
      },
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "45px", // override the row height
        color: "black",
      },
    },
    columns: {
      style: {
        minHeight: "92px", // override the row height
        color: "red",
        backgroundColor: "red",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        color: "white",
        backgroundColor: "#26A59A",
        fontSize: "18px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        backgroundColor: "white",
      },
    },
  };
  ////////////////////////////modle////////////////////////////
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //////////////////////////////////////////////////////////////

  /////////////from validation///////////////////
  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  ////////////////////////////////////////////////

  // function handlerFilter(event) {
  //   const newData = records.filter((row) => {
  //     return row.name.toLowercase().includes(event.target.value.toLowercase());
  //   });
  //   setRecords(newData);
  // }

  return (
    <>
      <div className="container mt-1  ">
        {/* <div>
            <input type="text" onChange={handlerFilter} />
          </div> */}
        <div className="float-start pe-3 pb-1 ms-3">
        
          <Button variant="primary" onClick={handleShow} className="float-start">
            Add patient
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            className=" position-absolute p-5 rounded-3"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form
                    noValidate
                    // validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter id"
                          // defaultValue="id"
                          name="patient_id"
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter name"
                          name="P_name"
                          value={patient.P_name}
                          // defaultValue="name"
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustomUsername"
                      >
                        <Form.Label>Gender</Form.Label>

                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) =>
                            setPatient({ ...patient, gender: e.target.value })
                          }
                        >
                          <option name="gender" value={patient.gender}>
                            Select
                          </option>
                          <option value={"male"} name="male">
                            Male
                          </option>
                          <option value={patient.female} name="female">
                            Female
                          </option>
                          <option value={patient.others} name="others">
                            Others
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom03"
                      >
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter age"
                          required
                          name="age"
                          value={patient.age}
                          onChange={
                            handleChange
                            // (e) =>
                            // setPatient({ ...patient, age: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter mobile no."
                          required
                          name="mobile"
                          value={patient.mobile}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>symptoms</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter symptoms"
                          required
                          name="symptoms"
                          value={patient.symptoms}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid symptoms.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom03"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter city"
                          required
                          name="city"
                          value={patient.city}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid city.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Enter Date"
                          required
                          value={patient.date}
                          name="date"
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid Data.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Entr time"
                          required
                          name="time"
                          value={patient.time}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid time.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <Col className="col-2 float-end mb-3 me-3">
            <Form.Control type="text" placeholder="Search....." onChange={hanlefilter} /></Col>
        <div className="container ">
          {/* <DataTable
            columns={columns}
            data={data}
            pagination
          
            customStyles={customStyles}
            fixedHeader
          fixedHeaderScrollHeight="510px"
          selectableRowsHighlight
          highlightOnHover
          /> */}
          <DataTable columns={columns} 
          data={data} 
          
          customStyles={customStyles}
          pagination
          
          fixedHeader
          fixedHeaderScrollHeight="510px"
          selectableRowsHighlight
          highlightOnHover
          />
          <Modal
            show={show1}
            onHide={updateClose}
            className=" position-absolute p-5 rounded-3"
          >
            <Modal.Header closeButton>
              <Modal.Title>update patient</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col>
                  <Form onSubmit={updateSubmit}>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom01"
                      >
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                          disabled
                          defaultValue={patientId?.patient_id}
                          placeholder="Enter id"
                          // defaultValue="id"
                          name="patient_id"
                          onChange={(e) => {
                            setpatientDataId({
                              ...patient,
                              patient_id: e.target.value,
                            });
                          }}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustom02"
                      >
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter name"
                          name="P_name"
                          defaultValue={patientId?.P_name}
                          // defaultValue="name"
                          onChange={(e) => {
                            setUpdate({ ...update, P_name: e.target.value });
                          }}
                        />
                        <Form.Control.Feedback>
                          Looks good!
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationCustomUsername"
                      >
                        <Form.Label>Gender</Form.Label>

                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) =>
                            setPatient({ ...update, gender: e.target.value })
                          }
                        >
                          <option name="gender" value={patient.gender}>
                            Select
                          </option>
                          <option defaultValue={patientId?.female} name="male">
                            Male
                          </option>
                          <option
                            defaultValue={patientId?.female}
                            name="female"
                          >
                            Female
                          </option>
                          <option
                            defaultValue={patientId?.others}
                            name="others"
                          >
                            Others
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom03"
                      >
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter age"
                          required
                          name="age"
                          defaultValue={patientId?.age}
                          onChange={(e) =>
                            setPatient({ ...update, age: e.target.value })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter mobile no."
                          required
                          name="mobile"
                          defaultValue={patientId?.mobile}
                          onChange={(e) => {
                            setUpdate({ ...update, mobile: e.target.value });
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>symptoms</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter symptoms"
                          required
                          name="symptoms"
                          defaultValue={patientId?.symptoms}
                          onChange={(e) => {
                            setUpdate({ ...update, symptoms: e.target.value });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid symptoms.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom03"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter city"
                          required
                          name="city"
                          defaultValue={patientId?.city}
                          onChange={(e) => {
                            setUpdate({ ...update, city: e.target.value });
                          }}
                        />
                     
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom04"
                      >
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Enter Date"
                          required
                          defaultValue={patientId?.date}
                          name="date"
                          onChange={(e) => {
                            setUpdate({ ...update, date: e.target.value });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid Data.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="3"
                        controlId="validationCustom05"
                      >
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                          type="time"
                          placeholder="Entr time"
                          required
                          name="time"
                          defaultValue={patientId?.time}
                          onChange={(e) => {
                            setUpdate({ ...update, time: e.target.value });
                          }}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide a valid time.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Button variant="secondary" onClick={updateClose}>
                        Close
                      </Button>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
           
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Pantientlist;
