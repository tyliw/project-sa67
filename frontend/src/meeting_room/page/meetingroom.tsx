// import React from 'react'
// import { Space, Table, Button, Col, Row, Divider, message, Card } from "antd";
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
// import Cardx from '../component/Card';
// // Icon
// import { FaPeopleGroup } from "react-icons/fa6";
// import { TbAirConditioning } from "react-icons/tb";
// import { BsTextareaResize } from "react-icons/bs";
// //
// const gridStyle: React.CSSProperties = {
//     width: '30%',
//     height:'250px',
//     // background:'red',
//     borderRadius:'10px 0 0 10px ',
// };
// const gridbodyStyle: React.CSSProperties = {
//     width: '70%',
//     height:'250px',
//     borderRadius:'0 10px 10px 0 ',
// };
// const backImg = (name: string): React.CSSProperties => {
//     return {
//         background: `url(${name}) no-repeat center center / cover`, // Set background image dynamically
//         borderRadius:'10px 0 0 10px ',
//     };
// };
// const endit=()=>{
//     return(
//         <EditOutlined key="edit" style={{ fontSize: '20px', color: 'rgb(250,250,250,)' }} />
//     );
// }
// const cardDetail=(name:string,size:string,capacity:number,air:number,type:string,Featues:string, details:string)=>{
//     const StyleHead: React.CSSProperties = {
//         display:'flex',
//         position:'absolute',
//         top:10,
//         justifyContent:'space-between',
//         alignContent:'center',
//         width:'100%',
//         background:'red',
//         // paddingLeft:'10px',
//         color:'#7A1CAC',
//     };
//     const Stylebody: React.CSSProperties = {
//         display: 'flex',
//         position:'absolute',
//         top:'20%',
//         width: '100%',
//         height: '50%',
//         // color:'#AD49E1',
//         padding: '3% 20px 5%',  // Adjusted for body padding
//     };
//     const StyleFoot: React.CSSProperties = {
//         display: 'flex',
//         position:'absolute',
//         bottom:10,
//         justifyContent:'space-around',
//         alignContent:'center',
//         textAlign:'center',
//         width: '100%',
//         fontSize:'10px',
//         gridRow:'3',
//         color:'#AD49E1',
//     };
//     return(
//         <Card style={gridbodyStyle} hoverable={false}>
//             <div style={StyleHead}>
//                 <h1>{name}</h1>
//                 {endit()}</div>
//             <div style={Stylebody}>
//                 <p>{details}</p>
//             </div>
//             <div style={StyleFoot}>
//                 <div><h1><FaPeopleGroup/></h1><h1>{capacity}</h1></div>
//                 <div><h1><TbAirConditioning/></h1><h1>{air}</h1></div>
//                 <div><h1><BsTextareaResize /></h1><h1>{size}m2</h1></div>
//                 <div><h1>Type</h1><h1>{type}</h1></div>
//             </div>
            
//         </Card>
//     );
// };
// const card = (name:string,size:string,capacity:number,air:number,tpye:string,Featues:string, details:string, img:string) =>{
//     return (
//         <Card hoverable={true} bordered={false} style={{ width:1000, height:250, margin:10, borderRadius:10}}>
//           <Card.Grid style={{...gridStyle,...backImg(img)}} hoverable={true}></Card.Grid>
//           {cardDetail(name,size,capacity,air,tpye,Featues, details,)}
//         </Card>
//       );
// };

// function meetingroom() {
//     const imageRoom1 = 'https://www.bitec.co.th/wp-content/uploads/2020/06/MR-213-Class-Room-01.jpg';
//     const imageRoom2 = 'https://images.meetingsbooker.com/images/venues/bitec-5.jpg';
//     const imageRoom3 = 'https://media.radissonhotels.net/image/radisson-hotel-tianjin-aqua-city/ballroom/16256-144413-f72460784_3xl.jpg';
//     const imageRoom4 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdq8IgmcJS6i9tKTYbkRaXRiAEKgcLEnO88g&s';
//     const imageRoom5 = 'https://t4.ftcdn.net/jpg/00/37/85/37/360_F_37853733_IVLKdbRju1qEe0MgpFlzvBFCJq7j5v7E.jpg';
//     const loremtest = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione ullam labore temporibus fuga ipsum voluptatum est quibusdam quidem magni! Enim impedit quis sapiente delectus esse atque quia perspiciatis sed eveniet!'
//   return (
//     <div style={{
//         // background:"red",
//         display:"flex",
//         flexDirection:"column",
//         justifyContent:"center",
//         alignItems:"center",
//         marginTop:'auto',
//         }}>
//         {/* {card('B1','200',100,15,'B+','remote',loremtest,imageRoom1)} */}
//         {/* {card('B2','300',200,30,'B+','remote',loremtest,imageRoom2)}
//         {card('B3','400',240,40,'B+','remote',loremtest,imageRoom3)}
//         {card('B4','500',400,20,'B+','remote',loremtest,imageRoom4)}
//         {card('B5','700',500,20,'B+','remote',loremtest,imageRoom5)} */}
//         <Cardx image={imageRoom1}/>
//         <Cardx image={imageRoom1}/>
//     </div>
    

//   )
// }

// export default meetingroom


// {/* <Card title="Card title" bordered={false} style={{ width: 1000 }} >
// <p>Card content</p>
// <p>Card content</p>
// <p>Card content</p>
// </Card> */}