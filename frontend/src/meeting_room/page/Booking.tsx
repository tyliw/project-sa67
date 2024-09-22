// import React from 'react';
// import { Button, Form, Input, Select, DatePicker, TimePicker } from 'antd';
// const { RangePicker } = TimePicker;

// const onFinish = (values: any) => {
//   console.log('Received values of form: ', values);
// };
// const handleChange = (value: string) => {
//     console.log(`selected ${value}`);
// };

// const Booking: React.FC = () => (
//     <div style={{display:'flex',justifyContent:'center'}}>
//   <Form
//     name="complex-form"
//     onFinish={onFinish}
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ width: 500 }}
//   >
//     <Form.Item label="Room">
//       <Select
//       defaultValue="lucy"
//       style={{ width: 335 }}
//       onChange={handleChange}
//       options={[
//         { value: 'B1', label: 'B1' },
//         { value: 'B2', label: 'B2' },
//         { value: 'B3', label: 'B3' },
//         { value: 'B4', label: 'B4' },
//         { value: 'B5', label: 'B5' },
//         { value: 'disabled', label: 'Disabled', disabled: true },
//       ]}
//     />
//     </Form.Item>



//     <Form.Item label="Frist Name">
//         <Form.Item
//           name='FristName'
//           noStyle
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="" />
//         </Form.Item>
//     </Form.Item>


//     <Form.Item label="Last Name">
//         <Form.Item
//           name='LastName'
//           noStyle
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="" />
//         </Form.Item>
//     </Form.Item>


//     <Form.Item label="Tel">
//         <Form.Item
//           name='Tel'
//           noStyle
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="" />
//         </Form.Item>
//     </Form.Item>


//     <Form.Item label="Email">
//         <Form.Item
//           name='Email'
//           noStyle
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="" />
//         </Form.Item>
//     </Form.Item>



//     <Form.Item label="Date" style={{ marginBottom: 0,  }}>
//       <Form.Item
//         name="date"
//         rules={[{ required: true, message: ''}]}
//         style={{ display: 'inline-block', width: 'calc(50% - 50px)' }}
//       ><DatePicker placeholder=""/>
//       </Form.Item>
//       <Form.Item
//         name="StrartTime"
//         rules={[{ required: true, message: ''}]}
//         style={{ display: 'inline-block', width: 'calc(60%)',marginLeft:15 }}
//       ><RangePicker/>
//       </Form.Item>
//     </Form.Item>



//     <Form.Item label=" " colon={false}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//   </div>
// );

// export default Booking;