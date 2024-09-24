import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PieChartOutlined, UserOutlined, TableOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { MdFastfood, MdOutlinePayment, MdOutlineBedroomParent, MdMeetingRoom } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoReceiptOutline } from "react-icons/io5";
import logo from "./assets/hotel_logo.png";
import { EmployeeInterface } from './employee/interfaces/IEmployee';

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
  getItem(<Link to="/">Log out</Link>, '11', <RiLogoutBoxLine />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem("employeeData");
    if (location.state?.employeeData) {
      setEmployeeData(location.state.employeeData);
    } else if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }
  }, [location.state]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getSelectedKey = () => {
    if (location.pathname === "/login/payment_history") return '9';
    if (location.pathname === "/login/payment") return '8';
    if (location.pathname.includes("/login/paymentmethod")) return '8';
    if (location.pathname.includes("/login/receipt")) return '8';
    if (location.pathname.includes("/login/room")) return '2';
    if (location.pathname.includes("/login/customer")) return '3';
    if (location.pathname.includes("/login/meeting-rooms")) return '4';
    if (location.pathname.includes("/login/booking-meeting-rooms")) return '10';
    if (location.pathname.includes("/login/food-service")) return '5';
    if (location.pathname.includes("/login/manage-data")) return '6';
    if (location.pathname.includes("/login/employee")) return '7';
    return '1'; // Default
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="logo" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={logo} alt="Logo" style={{ width: "80%", margin: "10px" }} />
          </div>
          <hr />
          <div
            className='profile-container'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "5px",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease, opacity 0.3s ease"
            }}
            onClick={() => navigate("/login/employee")}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.5"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          >
            <img
              src={employeeData?.Profile || 'default-profile-image.png'} // Provide a default image if Profile is undefined
              alt="Profile"
              style={{
                width: collapsed ? "40px" : "50px",
                height: collapsed ? "40px" : "50px",
                objectFit: "cover",
                margin: "10px",
                borderRadius: "100%",
                transition: "transform 0.3s ease"
              }}
            />
            {!collapsed && (
              <h1 style={{ fontSize: "16px", color: "white", transition: "opacity 0.3s ease" }}>
                {employeeData?.FirstName} {employeeData?.LastName}
              </h1>
            )}
          </div>
          <Menu
            theme="dark"
            selectedKeys={[getSelectedKey()]}
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
