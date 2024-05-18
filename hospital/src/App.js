

import Dashboard from './Dashboard/Component/Dashboard';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Auth/Login/Login'
import Adminlayout from './AdminLayout/Adminlayout';
import Pantientlist from './Pantient/Pantientlist';
import { createContext } from 'react';
import RoomList from './Room/RoomList';
import DepartmentList from './Department/DepartmentList'
import EmployeeList from './Employee/EmployeeList';
import EmpProfileList from './EmpProfile/EmpProfileList'
import Card from './Dashboard/Component/Card'
import Role from './Role/Role';
import Signup from './Auth/Signup/Signup'


export const userContext = createContext();
function App() {
  return (
    
    
      
      <BrowserRouter>
      {/* <Login/> */}
      <Routes>
        {/* <Route path='/' element={<Signup/> } ></Route> */}
        <Route path='/' element={<Login/> } ></Route>
        <Route path='/dashboard' element={<Dashboard/> } >
        <Route path='/dashboard/pantientlist' element={<Pantientlist/> } ></Route>
        <Route path='/dashboard/card' element={<Card/>}></Route>
        <Route path='/dashboard/roomlist' element={<RoomList/> } ></Route>
        <Route path='/dashboard/department' element={<DepartmentList/> } ></Route>
        <Route path='/dashboard/employee' element={<EmployeeList/> } ></Route>
        <Route path='/dashboard/EmpProfile' element={<EmpProfileList/>} ></Route>
        <Route path='/dashboard/role' element={<Role/>} ></Route>

        
        </Route>
      </Routes>
      </BrowserRouter>
  
      
  
  );
}

export default App;
