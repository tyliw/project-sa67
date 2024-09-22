// import React from 'react'
// import './Dashboard.css'
// import { IoPeople } from "react-icons/io5";

// import { FaBed } from "react-icons/fa";
// import { MdFastfood } from "react-icons/md";
// import { MdMeetingRoom } from "react-icons/md";
// import { GrBottomCorner } from 'react-icons/gr';
// import Graph from '../component/Graph/Bar';
// import  Doughnut  from '../component/Graph/Doughnut';
// import Calendar from '../component/Calendar';
// import LineChart from '../component/Graph/Line';



// function Dashboard() {
//     const handleClick = () => {
//         alert('Button clicked!');
//     };
//     const style:React.CSSProperties={
//         display:'flex',
//         flexFlow:'column',
//         width:'100%',
//         height:'100%',
//         // background:'gray'
//     }
//   return (
//     <div style={style}>
//         <div className='HeadDasboard'>
//             <div className="HeadTitle">
//                 <h2>title</h2>
//             </div>
//             <div className='DashboardHead'>
//                 <div className="card item1">
//                     <div className="cardTitle">people</div>
//                     <div className="cardAmount"><h2>200</h2></div>
//                     <div className="cardIcon"><p><IoPeople /></p></div>
//                     <div className='cardBotton'>
//                         <div><div onClick={handleClick}>view</div></div>
//                     </div>
//                 </div>

//                 <div className="card item2">
//                     <div className="cardTitle">people</div>
//                     <div className="cardAmount"><h2>200</h2></div>
//                     <div className="cardIcon"><p><FaBed /></p></div>
//                     <div className='cardBotton'>
//                         <div><button onClick={handleClick}>view</button></div>
//                     </div>
//                 </div>
//                 <div className="card item3">
//                     <div className="cardTitle">people</div>
//                     <div className="cardAmount"><h2>200</h2></div>
//                     <div className="cardIcon"><p><MdFastfood /></p></div>
//                     <div className='cardBotton'>
//                         <div><button onClick={handleClick}>view</button></div>
//                     </div>
//                 </div>
//                 <div className="card item4">
//                     <div className="cardTitle">people</div>
//                     <div className="cardAmount"><h2>200</h2></div>
//                     <div className="cardIcon"><p><MdMeetingRoom /></p></div>
//                     <div className='cardBotton'>
//                         <div>
//                             <button onClick={handleClick}>view</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//         </div>
//         <div className="DashboardBody">
//             <div className="DashboardBody-Left">
//                 <div className="DashboardBody-Left-Graph">
//                     <div className="graph graph1"><Graph/></div>
//                     <div className="graph graph2"><Doughnut/></div>
//                 </div>
//                 <div className="DashboardBody-Left-ShowData">
//                     <div className="Showdata-Time">
//                         <LineChart/>
//                     </div>
//                 </div>
//             </div>
//             <div className="DashboardBody-Right">
//                 <div className="graph graph3"><Calendar/></div> 
//                 <div className="graph graph6"></div> 
//             </div>
//         </div>

        

//     </div>
//   )
// }

// export default Dashboard