import React, { useState, useEffect } from 'react'
import dashboardmodel from '../../model/dashboardmodel';
import DataTable from 'react-data-table-component'

function DataTable1() {
    const [data,setData] = useState([]);

    const empDataList = async ()=>{

        const empData = await dashboardmodel.list().then((res)=>{
          
            return res.data
        })
        setData(empData)

    }

    console.log(data)
    useEffect(()=>{
        empDataList() 
    },[])


    const columns = [
        {
            name: 'emp_id',
            selector: row => row.emp_id,
        },
        {
            name: 'emp_name',
            selector: row => row.emp_name,
        },
        {
            name: 'emp_qulification',
            selector: row => row.emp_qulification,
        },
        {
            name: 'DOJ',
            selector: row => row.DOJ,
        },
        {
            name: 'email',
            selector: row => row.email,
        },
        {
            name: 'emp_department',
            selector: row => row.emp_department,
        },
        {
            name: 'emp_exprience',
            selector: row => row.emp_exprience,
        },
        {
            name: 'password',
            selector: row => row.password,
        },
        
    ];
    
    

  return (
    <div>
      <DataTable
			columns={columns}
			data={data}
		/>
    </div>
  )
}

export default DataTable1      
