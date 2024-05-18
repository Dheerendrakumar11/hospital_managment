import React, { useEffect, useState } from "react";
import "../Asset/Style/Room.css";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Modal1 from 'react-bootstrap/Modal';

function RoomList() {
  const [data, setdata] = useState([]);
  const [filter, setFilter] = useState([]);
  
  const [dataId,setDataId] = useState({})
  const [roomNo,setRoomNo] = useState()
  
  
  
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true)
    setDataId({})
  };
  
  const [room, setRoom] = useState({
    room_no: "",
    room_name: "",
  });

  const [update,setUpdate] = useState({
    room_no:"",
    room_name: "",
  })
   
  const preFormData = (room,name)=>{
    setUpdate({
      ...update,
      room_no:room,
      room_name:name ,
    })
    handleShow1()
  }
  ////////////////////filter Data////////////////////////////////////////////////

 const handlefilter = (e)=>{
 
    const newData = filter.filter(row=>row.room_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setdata(newData)

 }

  ////////////////////////get data/////////////////////////

  const getDataRoom = async () => {
    const apiURL = "http://localhost:8010/room";

    await axios
      .get(apiURL)
      .then((result) => {
        console.log(result.data, "result");
        setdata(result.data);
        setFilter(result.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getDataRoom();
  }, []);

  useEffect(() => {

    getDataRoom();
  }, []);

  //////////////////////////POST API//////////////////////////////

  const handleChange = (e) => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(room);

    fetch("http://localhost:8010/room/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(room),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Data saved successfully:${data}`);
        getDataRoom();
        handleClose();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch opration:", error);
      });
  };

  ///////////////////////////////////////////PUT//////////////////////////////////////////////////////

 const handleUpdate = ((e)=>{
   e.preventDefault()
   axios.put(`http://localhost:8010/room/update/${roomNo}`,update)
   .then((result)=>{
    console.log(result.data)
    if(result.data.Status){
      getDataRoom()
      handleClose1()
    }
    else{
      getDataRoom()
      handleClose1()
    }
   })
   .catch((err)=>{
    console.log(err)
   })

 })

 const getDataById = (roomNo)=>{
     
  axios.get(`http://localhost:8010/room/byid/${roomNo}`)
  .then((res)=>{
    console.log(res,"getDataByID")
    setDataId(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })

 }
//////////////////dekete//////////////////////
 const deleteData = (Id)=>{
   axios.delete(`http://localhost:8010/room/delete/${Id}`)
   .then((res)=>{
    console.log(res)
    getDataRoom()
   })
 }



  //////////////Data tables/////////////////////////////////////////////////
  const columns = [
    {
      name: "Room no.",
      selector: (row) => row.room_no,
    },
    {
      name: "Name",
      selector: (row) => row.room_name,
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <Row>
            <Col>
              <BorderColorIcon
                sx={{
                  bgcolor: "#198754",
                  color: "white",
                  borderRadius: 1,
                  height: "25px",
                  width: "30px",
                }}
                onClick={()=>{
                  preFormData(row.room_no,row.room_name)
                  setRoomNo(row.room_no)
                  getDataById(row.room_no)
                }}
              />
            </Col>
            <Col>
              <DeleteIcon
                sx={{
                  bgcolor: "#DC3545",
                  color: "white",
                  borderRadius: 1,
                  height: "25px",
                  width: "30px",
                }}

                onClick={()=>{deleteData(row.room_no)}}
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
        // width:"400px"
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
    <Container>
  
      <Row>
            <Col> <Button variant="primary" onClick={handleShow} className="mb-3">
            Add Room
          </Button></Col>
            <Col className="col-2 float-end mb-3">
            <Form.Control type="text" placeholder="Search....."  onChange={handlefilter}/></Col>
          </Row>

      <Modal show={show} onHide={handleClose} className="m-5 ">
        <Modal.Header closeButton style={{ backgroundColor:"#26A59A",borderRadius:"",borderStyle:"none"}}>
          <Modal.Title style={{color:"white"}}>Add Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Room No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Room number"
                name="room_no"
                value={room.room_no}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Room Name"
                name="room_name"
                onChange={handleChange}
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

      {/* ////////////////////DATATALE/////////////////////////////////////// */}

      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="510px"
        selectableRowsHighlight
        highlightOnHover
      />

      {/* ////////////////////////Edit//////////////////////////////// */}
    

      <Modal1 show={show1} onHide={handleClose1} className="m-5">
        <Modal.Header closeButton  style={{ backgroundColor:"#26A59A",borderRadius:"",borderStyle:"none"}}>
          <Modal.Title style={{color:"white"}}>Update Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Room No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Room number"
                name="room_no"
                value={update.room_no}
                defaultValue={dataId.room_no}
                onChange={(e)=>setRoom(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Room Name"
                name="room_name"
                value={update.room_name}
                defaultValue={dataId.room_name}
                onChange={(e)=>setUpdate({...update,room_name:e.target.value})}
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
    </Container>
  );
}

export default RoomList;
