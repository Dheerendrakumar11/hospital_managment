import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import {Container,Row,Col} from 'react-bootstrap';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import DataTable from 'react-data-table-component';  

function EmpProfile() {
 const [data,setData] = useState([]);

 const showData = ()=>{
    const apiURL = `http://localhost:8010/profile/get`
  axios.get(apiURL)
  .then((res)=>{
    console.log(res)
    setData(res.data)
  }).catch((error)=>{
      console.log(error)
  })
 }
 useEffect(()=>{
  showData()
 },[])

 const columns = [
	{
		name: 'ID',
		selector: row => row.emp_id,
	},
	{
		name: 'Name',
		selector: row => row.emp_name,
	},
	// {
	// 	name: 'DOB',
	// 	selector: row => row.DOB,
	// },
	// {
	// 	name: 'Qulaification',
	// 	selector: row => row.qualification,
	// },
	// {
	// 	name: 'Gender',
	// 	selector: row => row.gender,
	// },
	// {
	// 	name: 'Mobile',
	// 	selector: row => row.mobile,
	// },
	// {
	// 	name: 'Email',
	// 	selector: row => row.email,
	// },
	// {
	// 	name: 'Address',
	// 	selector: row => row.address,
	// },
];
  return (
    <>
    <div>
      <h1>EmpProfile List</h1>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>EmpId</th>
          <th>Emp Name</th>
          <th>DOB</th>
          <th>Qualification</th>
          <th>gender</th>
          <th>mobile</th>
          <th>email</th>
          <th>address</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {
          data.map((item)=>
            <tr>
            <td>{item.emp_id}</td>
            <td>{item.emp_name}</td>
            <td>{moment(item.DOB).format('DD-MM-YYYY')}</td>
            <td>{item.qualification}</td>
            <td>{item.gender}</td>
            <td>{item.mobile}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td>{<img src={item.image} style={{width:"40px",height:"40px"}}/>}</td>
          </tr>
            

          )
        }
        
      </tbody>
     </Table>
  <Container fluid >
    <Row className=''>

    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
              <ol className="breadcrumb mb-0">
                {/* <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">User</li> */}
                <li className="breadcrumb-item active" aria-current="page">User Profile</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
              {
                  
                  (item)=>{

                    return(

                      <img src={item.image} style={{width:"40px",height:"40px"}}/>
                    )
                  
                  }  
               
                }
            
                <h5 className="my-3">Dr Rohan</h5>
                <p className="text-muted mb-1">Doctor</p>
                <p className="text-muted mb-4">MBBS BHOPAL</p>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary">Follow</button>
                  <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-outline-primary ms-1">Message</button>
                </div>
              </div>
            </div>
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                {/* <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning"></i>
                    <p className="mb-0">https://mdbootstrap.com</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                    <p className="mb-0">@mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                    <p className="mb-0">mdbootstrap</p>
                  </li>
                </ul> */}
                <DataTable
			columns={columns}
			data={data}
		/>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
              <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
              {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{item.emp_name}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Date of Birth</p>
              </div>
              <div class="col-sm-9">
                {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{moment(item.DOB).format('DD-MM-YYYY')}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Qualification</p>
              </div>
              <div class="col-sm-9">
                {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{item.qualification}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Gender</p>
              </div>
              <div class="col-sm-9">
              {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{item.gender}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">mobile</p>
              </div>
              <div class="col-sm-9">
                {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{(item.mobile)}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{(item.email)}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                {
                  data.map((item)=>{
                    
                    return(

                      <p class="text-muted mb-0">{(item.address)}</p>
                    )
                  }
                )
                }
              </div>
            </div>
            <hr/>






              </div>
            </div>

            {/* <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    Content
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mb-md-0">
                  <div className="card-body">
                    
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
        </Row>
  </Container>
    </div>
    </>
  )
}

export default EmpProfile
