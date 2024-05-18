import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from 'axios'
import {Container,Row,Col} from 'react-bootstrap'
export const data1 = [
  ["Year", "day", "Month", "Year"],
  ["2021", "1500", 400, 12200],
  ["2022", 1170, 460, 21250],
  ["2023", 660, 1120, 10300],
  ["2024", 1030, 540, 9350],
];
//////////////pie charts/////////////
export const data2 = [
  ["Task", "Hours per Day"],
  ["Abdominal ", 11],
  ["Blood in stool", 2],
  ["Chest pain", 2],
  ["Constipation", 2],
  ["Cough ", 7],
];

export const options = {
  chart: {
    title: "Hospital Performance",
    subtitle: "Today, One Month,Year   and Profit: 2020-2024",
  },
};

export const options2 = {
  title: "Patient Symptoms Records",
};
export function Graph() {
  
  const [day,setDay] = useState([])

  const getDay = ()=>{

    axios.get('http://localhost:8010/api/patient/day')
    .then((result)=>{
      console.log(result.data)
      setDay(result.data)
    }).catch((error)=>{
      console.log(error)
    })
  }
  useEffect(()=>{
    getDay()
  },[])

  return (
    <>
    <Container>
      <Row>
        <Col ><Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data1}
      options={options}
      
    /></Col>
        <Col>
        <Chart
      chartType="PieChart"
      data={data2}
      options={options2}
      width={"100%"}
      height={"400px"}
    />
        </Col>
      </Row>
    </Container>
    
   
    </>
  );
}



export default Graph