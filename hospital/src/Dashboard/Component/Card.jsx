import React from 'react'
import Card from 'react-bootstrap/Card';
import {Container,Row,Col} from 'react-bootstrap'
import {Graph}  from './Graph';
import { MdGroups } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";

function card() {
  return (
    <div>
      <>
      <Container fluid className='d-flex gap-5 d-flex justify-content-center align-item-center' style={{flexWrap:"Wrap"}}>
        <Card style={{ width: '15rem', height:"8rem",boxShadow:"0px 0px 15px 0px #28B6F6",backgroundColor:"gradian(#1689FC)" }}>
      <Card.Body>
      <Container>
        
        <Row>
          <Col className='col-8 d-flex justify-content-center align-item-center text-start'>
            
          <div  className='float-bottum bt-5'>
            <h2 style={{color:"#26A59A"}}className='text-lowercase'>123</h2>
            <p style={{color:"#265073"}} className='pt-3'>Total Employee</p></div>
          </Col>
          <Col className='col-4 pb-1'
          > 
          <MdGroups className='float-end'  style={{height:"6rem",width:"4rem",color:"#26A59A",borderRadius:"5px"}}/>
          </Col>
        </Row>
      </Container>
      </Card.Body>
    </Card>
        <Card className='' style={{ width: '15rem', height:"8rem",boxShadow:"0px 0px 15px 0px #28B6F6" }}>
      <Card.Body>
      <Container>
        
        <Row>
          <Col className='col-8 d-flex justify-content-center align-item-center text-start'>
            
          <div  className=' bt-5'>
            <h2 style={{color:"#26A59A"}}className='text-lowercase'>13</h2>
            <p className='pt-3' style={{color:"#265073"}}>Total Doctor   </p></div>
          </Col>
          <Col className='col-4  '
          > 
          <FaUserDoctor className='float-end mt-4'  style={{height:"3rem",width:"4rem",color:"#26A59A",borderRadius:"5px"}}/>
          </Col>
        </Row>
      </Container>
      </Card.Body>
    </Card>
        <Card style={{ width: '15rem', height:"8rem",boxShadow:"0px 0px 15px 0px #28B6F6" }}>
      <Card.Body>
      <Container>
        
        <Row>
          <Col className='col-8 d-flex justify-content-center align-item-center text-start'>
            
          <div  className='float-bottum bt-5'>
            <h2 style={{color:"#26A59A"}}className='text-lowercase'>50</h2>
            <p className='pt-3' style={{color:"#265073"}}>Total Pantient </p></div>
          </Col>
          <Col className='col-4 '
          > 
          <MdGroupAdd className='float-end mt-3'  style={{height:"3.5rem",width:"4rem",color:"#26A59A",borderRadius:"5px"}}/>
          </Col>
        </Row>
      </Container>
      </Card.Body>
    </Card>
        <Card style={{ width: '15rem', height:"8rem",boxShadow:"0px 0px 15px 0px #28B6F6" }}>
      <Card.Body>
      <Container>
        
        <Row>
          <Col className='col-8 d-flex justify-content-center align-item-center text-start'>
            
          <div  className='float-bottum bt-5'>
            <h2 style={{color:"#26A59A"}}className='text-lowercase'>123</h2>
            <p style={{color:"#265073"}} className='pt-3'>Total Employee</p></div>
          </Col>
          <Col className='col-4 '
          > 
          <MdGroups className='float-end'  style={{height:"5rem",width:"4rem",color:"#26A59A",borderRadius:"5px"}}/>
          </Col>
        </Row>
      </Container>
      </Card.Body>
    </Card>

        </Container>

        <Container className='m-5' >
      <Row>
        <Col>
    <Graph/>
        </Col>
        {/* <Col>
    <Graph/>
        </Col> */}
      </Row>
    </Container>
      </>
    </div>
  )
}

export default card
