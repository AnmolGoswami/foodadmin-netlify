import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'


const Sidebar = ({sidebarOpen}) => {
    return (

        <div className={`border-end bg-white ${sidebarOpen ? '':'d-none'}`} id="sidebar-wrapper">
            <div className="sidebar-heading border-bottom bg-light">
                <img src={assets.logo} alt="" srcset=""  height={45} width={45}/>
            </div>
            <div className="list-group list-group-flush">
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add"><i class="bi bi-plus-circle me-2"></i> Add Food</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/list"><i class="bi bi-card-checklist me-2"></i> List Foods</Link>
                <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/order"><i class="bi bi-bag me-2"></i> Orders</Link>
                
            </div>
        </div>
    )
}

export default Sidebar