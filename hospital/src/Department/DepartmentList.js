import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal1 from 'react-bootstrap/Modal';
import moment from 'moment'


function DepartmentList() {
  const [data, setData] = useState([]);
  const [filterData,setFilterData] = useState([])
  const [values, setValues] = useState({
    dept_id: "",
    dept_name: "",
    dept_est_date: "",
  });

  const [dataId, setDataId] = useState({});
  const [deptId, setDeptId] = useState();
  const [update, setUpdate] = useState({
    dept_id: "",
    dept_name: "",
    dept_est_date: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true)
    setDataId({})
  };

  const preFormData = (id,name,date) => {
    setUpdate({
      ...update,
      dept_id: id,
      dept_name: name,
      dept_est_date: date,
    });

    handleShow1()
  };
  ///////////////////////get///////////////////////////////////////
  const getData = async () => {
    const apiURL = "http://localhost:8010/department/get";
    await axios.get(apiURL).then((result) => {
      console.log(result.data);
      setData(result.data);
      setFilterData(result.data)
    });
  };
  useEffect(() => {
    getData();
  }, []);

  //////////////////////////////post/////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = "http://localhost:8010/department/add";
    await axios.post(apiURL, values).then((result) => {
      console.log(result.data);

      handleClose();
      getData();
    });
  };

  ///////////////////////////put////////////////////////////////////////

  const getDataById = async (deptId) => {
    
    const result = await axios.get(`http://localhost:8010/department/byid/${deptId}`);

    console.log(result, "response successful of punt");
    setDataId(result.data);
  };
  // useEffect(()=>{
  //   getDataById()
  // },[]
  // )

  const handleUpdate = async (event) => {
    event.preventDefault();

    await axios
      .put(`http://localhost:8010/department/update/${deptId}`, update)
      .then((result) => {
        console.log(result.data);

        handleClose1();
        getData();
      })
      .catch((err)=>{
        console.log(err)
      })
  };
/////////////////////delete///////////////////////

const handleDelete = (id)=>{

  axios.delete(`http://localhost:8010/department/delete/${id}`)
  .then((result)=>{
    console.log(result)
    getData()
  })

}
//////////////////////////filter/////////////////////////

const hanlefilter = (event)=>{
  const newData = filterData.filter(row=>
    row.dept_name.toLowerCase().includes(event.target.value.toLowerCase())
  )
  setData(newData)
  
}


  const columns = [
    {
      name: "ID",
      selector: (row) => row.dept_id,
    },
    {
      name: "Department",
      selector: (row) => row.dept_name,
    },
    {
      name: "Established Date",
      type:"date",
      selector: (row) => row.dept_est_date,
      format: (row) => moment(row.dept_est_date).format('DD-MM-YYYY')
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
                  preFormData(row.dept_id, row.dept_name, row.dept_est_date);
                  setDeptId(row.dept_id);
                  getDataById(row.dept_id);
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
              onClick={()=>{handleDelete(row.dept_id)}}
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
        // width:"400px"
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        color: "white",
        backgroundColor: "#26A59A",
        fontSize: "18px",
        //   width:"400px"
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  return (
    <>
      <Container>
        <Row>
          <h1>Department List</h1>
          <Col>
          <Row>
           <Col className="col-2 mb-3">
           <Form.Control type="text" placeholder="Search....." onChange={hanlefilter} />
           
           </Col>
           <Col>
           <Button
              variant="primary"
              onClick={handleShow}
              className="float-end mb-3"
            >
              Add dept
            </Button>
           </Col>
          </Row>
           

            <Modal
              show={show}
              onHide={handleClose}
              animation={false}
              className="m-5"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Department</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dept ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter dept id"
                      name="dept_id"
                      onChange={(e) => {
                        setValues({ ...values, dept_id: e.target.value });
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Dept Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter dept name"
                      name="dept_name"
                      onChange={(e) =>
                        setValues({ ...values, dept_name: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Dept Name</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Enter date"
                      name="dept_est_date"
                      onChange={(e) =>
                        setValues({ ...values, dept_est_date: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
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
          </Col>
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
          />
        </Row>
      </Container>

      {/* ///////////////edit////////////////////// */}
     
      <Modal1 show={show1} onHide={handleClose1} className="m-5">
        <Modal.Header closeButton  style={{ backgroundColor:"#26A59A",borderRadius:"",borderStyle:"none"}}>
          <Modal.Title style={{color:"white"}}>Update Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
                  <Form.Group className="mb-3">
                    <Form.Label>Dept ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter dept id"
                      name="dept_id"
                      value={update.dept_id}
                      defaultValue={dataId?.dept_id}
                      onChange={(e)=>setValues(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Dept Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter dept name"
                      name="dept_name"
                      value={update.dept_name}
                      defaultValue={dataId?.dept_name}
                      onChange={(e) =>
                        setUpdate({...update,dept_name:e.target.value})
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Dept Name</Form.Label>
                    <Form.Control
                      type="date"
                      
                      name="dept_est_date"
                      value={update.dept_est_date}
                      defaultValue={dataId?.dept_est_date}
                      onChange={(e) =>
                        setUpdate({ ...update, dept_est_date: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          </Modal.Footer>
                </Form>
        </Modal.Body>
      
      </Modal1>
    </>
  );
}

export default DepartmentList;
