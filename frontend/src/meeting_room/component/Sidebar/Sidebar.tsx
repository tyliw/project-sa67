import React, { useEffect, useState } from 'react';
import { Link, Route, Router, Routes } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { IoIosBed } from "react-icons/io";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { FaBowlFood } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import './Sidebar.css'
// import Dashboard from '../../page/Dashboard';
import Dashboard from '../../page/Dashboard/Dashboard';
import Meeting_Room from '../../page/MeetingRoom/Meeting_Room';
import Edit from '../../page/Edit';
import Booking from '../../page/Booking/index';




const Sidebar: React.FC = () => {
    const [respSidebar,setRespSidebar] = useState<boolean>(false) 
    const [FA, setWidth] = useState<string>('220px');
    function clicker(){
        setRespSidebar(!respSidebar)
        console.log(respSidebar);
    }
    useEffect(() => {
        if (respSidebar) {
        setWidth('50px');
        } else {
        setWidth('220px');
        }
    }, [respSidebar]);
  return (
    <div style={{
        display:'flex',
        width:'100%',
        height:'100vh',
    }}>
        <div style={{
            display:'flex',
            flexFlow:'column', 
            width:FA,
            height:'100vh',
            position:'fixed',
            // background:'#073763',
            background:'#00072D',
            padding:'20px',
            transition: '0.8s',
            boxShadow:'20px 20px 20px rgb(0,0,0,.1), -20px -20px 20px rgb(255,255,255,.1)',
            color:'white',
    }}>
        <div className={`sidebarLogo ${respSidebar ? 'active' : ''}`}>
            
        </div>
        <div className="sidebarLinkToPage">
                     
            <Link className={`sidebarLink sidebarItem1 ${respSidebar ? 'activeMenu' : ''}`} 
                to="/Dashboard">
                <div className='sidebarIcons'><MdDashboard/></div>
                <p>Dashboard</p>
            </Link>
            <Link className={`sidebarLink sidebarItem2 ${respSidebar ? 'activeMenu' : ''}`} to="/Dashboard">
                <div className='sidebarIcons'><IoIosBed/></div>
                <p>Room</p>
            </Link>
            <Link className={`sidebarLink sidebarItem3 ${respSidebar ? 'activeMenu' : ''}`} to="/Dashboard">
            <div className='sidebarIcons'><FaBowlFood/></div>
                <p>Food</p>
            </Link>
            <Link className={`sidebarLink sidebarItem4 ${respSidebar ? 'activeMenu' : ''}`} to="/Meeting_Room/booking">
                <div className='sidebarIcons'><IoMdPeople/></div>
                <p>Employee</p>
            </Link>
            <Link className={`sidebarLink sidebarItem5 ${respSidebar ? 'activeMenu' : ''}`} to="/Meeting_Room">
                <div className='sidebarIcons'><MdOutlineMeetingRoom/></div>
                <p>Meeting Room</p>
            </Link>
        </div>
        <div className="sidebarCheckOut">
            <Link className={`sidebarLink sidebarItem6 ${respSidebar ? 'activeMenu' : ''}`} to="/MeetingRoom">
                <div className='sidebarIcons'><MdOutlinePriceCheck/></div>
                <p>Check Out</p>
            </Link>
        </div>
        <div className="sidebarLogout">
            <Link className={`sidebarLink ${respSidebar ? 'activeMenu' : ''}`} to="/Dashboard">
            <div className='sidebarIcons'><CiLogout/></div>
                <p>LogOut</p>
            </Link>
        </div>
        
        <div className={`buttomResposive ${respSidebar ? 'activeBack' : ''}`} onClick={clicker}>
            <div className="buttomResposiveIcons">
                <div className="iconsBefore"><MdNavigateBefore/></div>
                <div className="iconsNext"><MdNavigateNext/></div>
            </div>
        </div>
    </div>
        <div className='BBBBody'
            style={{
                marginLeft:`${respSidebar ? '90px':'270px'}`,
                width:`${respSidebar ? '91%':'77%'}`
                }}>
            <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                {/* <Route path="/MeetingRoom" element={<MeetingLayout />} /> */}
                <Route path="/Meeting_Room" element={<Meeting_Room />} />
                <Route path="/Meeting_Room/Edit" element={<Edit />} />
                <Route path="/Meeting_Room/Booking" element={<Booking />} />
            </Routes>

        </div>
    </div>
    
  )
   
}
export default  Sidebar;