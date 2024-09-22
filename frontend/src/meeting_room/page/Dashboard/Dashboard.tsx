import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Bar from '../../component/Graph/Bar'
import Bar2 from '../../component/Graph/Bar2'
import Doughnut from '../../component/Graph/Doughnut'
import Line from '../../component/Graph/Line'
import { IoPeople } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { MdMeetingRoom } from "react-icons/md";
import { GetListBookingPricePerDay, GetListMeeintgRoomsPerDay, GetListMeetingRoomPerMonth, GetListOrderPerDay, GetListPaymentsPerDay, GetListPeoplePerDay, GetListRoomPerDay, GetMostMenus } from '../../../dashboard/sevice/https'
import moment from 'moment';

interface peoplePerDay {
  Day?:string
  Total?:number
}
interface ordersPerDay {
  order_day?:string
  total_price?:number
  amount?:number
}
interface roomsPerDay {
  CheckInDate?:string
  Count?:number
}
interface paymenetPerDay {
  PaymentDay?:string
  TotalAmount?:number
}
interface meetingRoomPerDay {
  date?:string
  total_bookings?:number
}

interface bookingPricePerDay {
  day?:string
  total_price?:number
}
interface mostMenus {
  MenuList?:string
  ImageMenu?:string
  Price?:number
}

function Dashboard() {
  const [roomPerDay, setRoomPerDay] = useState<roomsPerDay[]>([]);
  const [orderPerDay, setOrderPerDay] = useState<ordersPerDay[]>([]);
  const [peoplePerDay, setPeoplePerDay] = useState<peoplePerDay[]>([]);
  const [paymentPerDay, setPaymentPerDay] = useState<paymenetPerDay[]>([]);
  const [menus, setMenuPerDay] = useState<mostMenus>();
  const [bookingPricePerDay, setBookingPricePerDay] = useState<bookingPricePerDay[]>([]);
  const [meetingRoomPerDay, setMeeitngRoomPerDay] = useState<meetingRoomPerDay[]>([]);
  const day = moment();
  const today = day.format('YYYY-MM-DD');
  

  const fetchRoomsParDay = async () => {
    try {
        const res = await GetListRoomPerDay();
        console.log(res)
        console.log(today)
        if (res) {
            setRoomPerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 
  };

  const fetchOrderParDay = async () => {
    try {
        const res = await GetListOrderPerDay();
        console.log(res)
        if (res) {
            setOrderPerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 
  };

  const fetchPeopleParDay = async () => {
    try {
        const res = await GetListPeoplePerDay();
        console.log(res)
        if (res) {
            setPeoplePerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 
  };

  const fetchMeetingRoomParDay = async () => {
    try {
        const res = await GetListMeeintgRoomsPerDay();
        console.log(res)
        if (res) {
          setMeeitngRoomPerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 
  };
  const fetchPaymentPerDay = async () => {
    try {
        const res = await GetListPaymentsPerDay();
        console.log(res)
        if (res) {
          setPaymentPerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 
  };

  const fetchBookingPricePerDay = async () => {
    try {
        const res = await GetListBookingPricePerDay();
        console.log(res)
        if (res) {
          setBookingPricePerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 

  };

  const fetchMostMenusPerDay = async () => {
    try {
        const res = await GetMostMenus();
        console.log(res)
        if (res) {
          setMenuPerDay(res);        
        }
    } catch (error) {
        console.error('Failed to fetch meeting rooms:', error);
    } 

  };

  useEffect(()=>{
    fetchRoomsParDay();
    fetchOrderParDay();
    fetchPeopleParDay();
    fetchPaymentPerDay();
    fetchMeetingRoomParDay();
    fetchBookingPricePerDay();
    fetchMostMenusPerDay();
  },[]);

  const todayTotalRooms = roomPerDay.find(day => day.CheckInDate === today)?.Count||0;
  const todayTotalOrder = orderPerDay.find(day => day.order_day === today)?.amount||0;
  const todayTotalPeople = peoplePerDay.find(day => day.Day === today)?.Total||0;
  const todayTotalOrderiPrice = orderPerDay.find(day => day.order_day === today)?.total_price||0;
  const todayTotalPrice = paymentPerDay.find(day=>day.PaymentDay==today)?.TotalAmount||0;
  const todayTotalMeeitngRoom = meetingRoomPerDay.find(day=>day.date==today)?.total_bookings||0;
  const todayTotalbookingPrice = bookingPricePerDay.find(day=>day.day==today)?.total_price||0;

  return (
    <div style={{width:'100%',height:'100%',padding:'10px'}}>
        <div className="Dashboardgrid">
            <div className="boxbox box1"> 
              <div className="cardItem cardTem1">
                <div><p>{todayTotalPeople}</p></div>
                <div><p>Total people</p></div>
                <span><IoPeople/></span>
              </div>
              <div className="cardItem cardTem2">
                <div><p>{todayTotalRooms}</p></div>
                <div><p>booking</p></div>
                <span><FaBed/></span>
              </div>
              <div className="cardItem cardTem3">
                <div><p>{todayTotalOrder}</p></div>
                <div><p>order</p></div>
                <span><MdFastfood/></span>
              </div>
              <div className="cardItem cardTem4">
                <div>
                  <p>{todayTotalMeeitngRoom}</p>
                </div>
                <div>
                  <p>meeting room</p>
                </div>
                <span><MdMeetingRoom/></span>
              </div>
            </div>
            <div className="boxbox box2">
              <div className='moneyD'>
                <p>balance</p>
                <p>฿{todayTotalPrice}.00</p>
              </div>
              <div className="moneyRoom">
                <div className='mRoom'>
                  <div>
                    <p>Room</p>
                  </div>
                  <div>
                    <p>{todayTotalbookingPrice} </p>
                    {/* <p>b</p> */}
                  </div>
                </div>
                <div className='mRoom'>
                  <div>
                    <p>Food</p>
                  </div>
                  <div>
                    <p>{todayTotalOrderiPrice}</p>
                    {/* <p>b</p> */}
                  </div>
                </div>
              </div>
              <div className="moneyFood">
                <div className="FoodImage">
                  <img src={menus?.ImageMenu} alt="" />
                  <div className="Hot">{menus?.MenuList}</div>
                </div>
              </div>
            </div>
            <div className="boxbox box3"><Bar/></div>
            <div className="boxbox box4"><Doughnut/></div>
            <div className="boxbox box6"><Bar2/></div>
            <div className="boxbox box7"><Line/></div>
        </div>
    </div>
  )
}

export default Dashboard