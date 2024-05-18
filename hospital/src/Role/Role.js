import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Container , Row, Col,Form} from 'react-bootstrap'
import DataTable from 'react-data-table-component';  

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";

function Role() {
  const [data,setData]= useState([])
  const [filterData, setFilterData] = useState([]);
  const [add,setAdd] = useState({
    role_id:"",
    role_name:""
  })
  



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
  
  

  const columns = [
	{
		name: 'ID',
		selector: row => row.role_id,
	},
	{
		name: 'Name',
		selector: row => row.role_name,
	},
  {
    name:"Action",
    cell:(row)=>{
     return( <Row>
    

      <Col>
        <AiFillEdit
          onClick={()=>{
            filup(
              row.role_id,
              row.role_name
            )
            setRoleId(row.role_id)
            getById(row.role_id)
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
            handleDelete(row.role_id);
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
    </Row>)
    }
  }
]

const customStyles = {
	rows: {
		style: {
			minHeight: '45px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '8px', // override the cell padding for head cells
			paddingRight: '8px',
      backgroundColor:"#26A59A",
      fontSize:"15px",
      fontWeight:"600",
      color:"white"

		},
	},
	cells: {
		style: {
			paddingLeft: '8px', // override the cell padding for data cells
			paddingRight: '8px',
		},
	},
};
    const getData = ()=>{
        axios.get("http://localhost:8010/api/roles")
        .then((result)=>{
            console.log(result.data)
            setData(result.data)
            setFilterData(result.data)
        })
    }
   useEffect(()=>{
    getData()
   },[])
  
  ////////////////////////////////post/////////////////////////////////////////

  const handleChange = (e)=>{
      
      setAdd({...add,[e.target.name]:e.target.value});

    }

  const handleSubmit = (e)=>{
    e.preventDefault();

   
       axios.post(`http://localhost:8010/api/post/roles`,add)
       .then((result)=>{
         console.log(result.data)
         getData()
         handleClose()
        })
        .catch((err)=>{
         console.log(err)
         getData()
          handleClose()
        })
       }
//////////////////////////update//////////////////////

const [dataId,setDataId] = useState({})
  const [roleId,setRoleId] = useState()
  const [update,setUpdate] = useState({
    role_id:"",
    role_name:""
  })
  

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true)
    setDataId({})
  };

const handleChange1 = (e)=>{
   setUpdate({...update,[e.target.name]:e.target.value})
}

const filup = (roleId,roleName)=>{
   setUpdate({
    ...update,
    role_id:roleId,
    role_name:roleName
  })
  handleShow1();
}
const handleUpdate =(e)=>{

  e.preventDefault();
  axios.put(`http://localhost:8010/api/post/roles${roleId}`,update)
  .then((result)=>{
    console.log(result,"post responce")
    if(result.data.status){
      getData();
      handleClose1();
    }else{
      getData();
      handleClose1();
    }
  })
  .catch((err)=>{
    
    console.log(err)
  })



}

const getById = (roleId)=>{
  axios.get(`http://localhost:8010/api/get/roles/${roleId}`)
  .then((res)=>{
console.log(res)
setDataId(res.data)
  })
  .catch((error)=>{
  console.log(error)
  })
}


////////////////////delete///////////////////

const handleDelete = (id)=>{

  axios.delete(`http://localhost:8010/api/delete/roles/${id}`)
  .then((result)=>{
    console.log(result)
    getData();
  })
}
     
//////////////////filler//////////////////////
const hanlefilter = (event) => {
  const newData = filterData.filter((row) =>
    row.role_name.toLowerCase().includes(event.target.value.toLowerCase())
  );
  setData(newData);
};    

       


  return (
    <>

    <Container>
    <h1>Role list</h1>
    <Row>
      <Col>
      <Button variant="primary" onClick={handleShow} className='mb-3'>
        Add Role
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
        <Row>
            <Col>

   

      <Modal show={show} onHide={handleClose} className='m-5'>
        <Modal.Header closeButton style={{backgroundColor:"#26A59A"}}>
          <Modal.Title style={{color:"white"}}>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role ID"
                name="role_id"
                value={add.role_id}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role Name"
                name="role_name"
                value={add.role_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
       
      </Modal> 
            <DataTable columns={columns} 
          data={data} 
          
          customStyles={customStyles}
          pagination
          
          fixedHeader
          fixedHeaderScrollHeight="510px"
          selectableRowsHighlight
          highlightOnHover
          />
             <Modal show={show1} onHide={handleClose1} className='m-5'>
        <Modal.Header closeButton style={{backgroundColor:"#26A59A"}}>
          <Modal.Title style={{color:"white"}}>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role ID"
                name="role_id"
                value={update.role_id}
                defaultValue={dataId?.role_id}
                onChange={handleChange1}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Role Name"
                name="role_name"
                value={update.role_name}
                defaultValue={dataId?.role_name}
                onChange={handleChange1}
              />
            </Form.Group>
            <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
       
      </Modal>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default Role
