import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { PieChartOutlined, UserOutlined, TableOutlined, BookOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import { MdFastfood } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdMeetingRoom } from "react-icons/md";
import Structure from './food_service/pages/structure/Structure';
import BookingList from './food_service/pages/booking_list/BookingList';
import Edit from './food_service/pages/edit/Edit';
import Create from './food_service/pages/create/Create';
import Home from './employee/Home';
import Payment from './payment/payment';
import Receipt from './payment/receipt/receipt';
// import './index.css'

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
  getItem(<Link to="/">Dashboard</Link>, '1', <PieChartOutlined />),
  getItem(<Link to="/room">Room</Link>, '2', <MdOutlineBedroomParent />),
  getItem(<Link to="/meeting-room">Meeting Room</Link>, '3', <MdMeetingRoom/>),
  getItem('Food', 'sub1', <MdFastfood />, [
    getItem(<Link to="/food-service">Food Service</Link>, '4', <BookOutlined />),
    getItem(<Link to="/manage-data">Manage Data</Link>, '5', <TableOutlined />),
  ]),
  getItem(<Link to="/employee">Employee</Link>, '6', <UserOutlined />),
  getItem('Payment', 'sub2', <MdOutlinePayment />, [
    getItem(<Link to="/payment">Payment</Link>, '7',),
    getItem(<Link to="/receipt">Receipt</Link>, '8',),
  ]),
  getItem(<Link to="/logout">Logout</Link>, 'logout', <RiLogoutBoxLine />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedBookingID, setSelectedBookingID] = useState<number | null>(null);

  const handleBookingSelect = (id: number) => {
    setSelectedBookingID(id);
  };
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            
          />
          {/* <button className='logout-button'>
            <div className='logout-icon'>
              <RiLogoutBoxLine />
            </div>
            <div>
              logout
            </div>
          </button> */}
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
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<h2>Dashboard Content</h2>} />

                {/* Room */}
                <Route path="/room" element={<h2>Room Content</h2>} />

                {/* Meeting Room */}
                <Route path="/meeting-room" element={<h2>Meeting Room Content</h2>} />
                
                {/* Food Service */}
                <Route path="/food-service" element={<BookingList onBookingSelect={handleBookingSelect} />} />
                <Route path="/structure/:bookingID" element={<Structure bookingID={selectedBookingID}/>} />
                <Route path="/manage-data" element={<Edit />} />
                <Route path="/create-menu" element={<Create />} />

                {/* Employee */}
                <Route path="/employee/*" element={<Home />} />

                {/* Payment */}
                <Route path="/payment" element={<Payment/>} />
                <Route path="/receipt" element={<Receipt/>} />

                <Route path="/logout" element={<h2>logout</h2>} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
