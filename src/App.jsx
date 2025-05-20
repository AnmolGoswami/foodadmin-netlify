import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFoods from './pages/AddFoods/AddFoods'
import ListFoods from './pages/ListFoods/ListFoods'
import Orders from './pages/Orders/Orders'
import Sidebar from './components/Sidebar/Sidebar'
import Menubar from './components/Menubar/Menubar'
import { ToastContainer} from 'react-toastify';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggalSidebar = ()=>{
        setSidebarOpen(!sidebarOpen)
    }
  return (
    <div className="d-flex" id="wrapper">
            <Sidebar sidebarOpen={sidebarOpen}/>
            <div id="page-content-wrapper">
                <Menubar toggalSidebar={toggalSidebar}/>
                <ToastContainer/>
                
                <div className="container-fluid">
                    <Routes>
                        <Route path='/add' element={<AddFoods/>}/>
                        <Route path='/list' element={<ListFoods/>}/>
                        <Route path='/order' element={<Orders/>}/>
                        <Route path='/' element={<ListFoods/>}/>

                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App