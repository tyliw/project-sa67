import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PieChartOutlined, UserOutlined, TableOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { MdFastfood, MdOutlinePayment, MdOutlineBedroomParent, MdMeetingRoom } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoReceiptOutline } from "react-icons/io5";
import logo from "./assets/logo.png";

const { Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/login/dashboard">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem('Room', 'sub1', undefined, [
    getItem(<Link to="/login/room">Booking</Link>, '2', <MdOutlineBedroomParent />),
    getItem(<Link to="/login/customer">Create Customer</Link>, '3', <UserOutlined />),
  ]),
  getItem('Meeting Room', 'sub4', undefined, [
    getItem(<Link to="/login/meeting-rooms">Meeting room</Link>, '4', <MdMeetingRoom />),
    getItem(<Link to="/login/booking-meeting-rooms">Booking</Link>, '10', <MdMeetingRoom />),
  ]),
  getItem('Food', 'sub2', undefined, [
    getItem(<Link to="/login/food-service">Food Service</Link>, '5', <MdFastfood />),
    getItem(<Link to="/login/manage-data">Manage Data</Link>, '6', <TableOutlined />),
  ]),
  getItem(<Link to="/login/employee">Employee</Link>, '7', <UserOutlined />),
  getItem('Payment', 'sub3', undefined, [
    getItem(<Link to="/login/payment">Payment</Link>, '8', <MdOutlinePayment />),
    getItem(<Link to="/login/payment_history">History</Link>, '9', <IoReceiptOutline />),
  ]),
  getItem(<Link to="/">Log out</Link>, '10', <RiLogoutBoxLine />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // ใช้ useLocation เพื่อตรวจสอบ path ปัจจุบัน

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // ฟังก์ชันเพื่อจับคู่ path กับ key ในเมนู
 const getSelectedKey = () => {
  if (location.pathname === "/login/payment_history") return '9'; // ตรวจสอบ payment_history ก่อน
  if (location.pathname === "/login/payment") return '8'; // ตรวจสอบ payment หลัง
  if (location.pathname.includes("/login/room")) return '2';
  if (location.pathname.includes("/login/customer")) return '3';
  if (location.pathname.includes("/login/meeting-rooms")) return '4';
  if (location.pathname.includes("/login/booking-meeting-rooms")) return '10';
  if (location.pathname.includes("/login/food-service")) return '5';
  if (location.pathname.includes("/login/manage-data")) return '6';
  if (location.pathname.includes("/login/employee")) return '7';
  return '1'; // ค่าเริ่มต้น
};


  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo">
            <img
                src={logo}
                alt="Logo"
                style={{ width: "80%", margin: "10px" }}
              />
          </div>
          <Menu
            theme="dark"
            selectedKeys={[getSelectedKey()]} // ใช้ selectedKeys แทน defaultSelectedKeys
            mode="inline"
            items={items}
          />
          <div className='container-logout-button'>
          </div>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px', padding: '16px', height: '100%' }}>
            <div
              style={{
                height: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            > 
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
