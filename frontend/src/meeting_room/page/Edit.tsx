// import React from 'react'
// import { Button, Form, Input, Select, DatePicker, TimePicker } from 'antd';


// const onFinish = (values: any) => {
//     console.log('Received values of form: ', values);
// };
// const handleChange = (value: string) => {
//     console.log(`selected ${value}`);
// };

// const Edit: React.FC = () => (
//     <div style={{display:'flex',justifyContent:'center' }}>
//   <Form
//     name="complex-form"
//     onFinish={onFinish}
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ width: 500 }}
//   >
//     <Form.Item>
//         <Form.Item
//           name='RoomName'
//           style={{ display: 'inline-block', width: 'calc(100%)', position:'absolute',top:10}}
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="Name" />
//         </Form.Item>
//     </Form.Item>

//     <Form.Item >
//         <Form.Item
//           name='Max people'
//           style={{ display: 'inline-block', width: 'calc(50%)'}}
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="Max people" />
//         </Form.Item>
//         <Form.Item
//           name='Air condition'
//           style={{ display: 'inline-block', width: 'calc(50%)'}}
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="Air condition" />
//         </Form.Item>
//     </Form.Item>

//     <Form.Item >
//         <Form.Item
//           name='Chair'
//           style={{ display: 'inline-block', width: 'calc(50%)', position:'absolute',top:-30}}
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="Chair" />
//         </Form.Item>
      
//         <Form.Item
//           name='Type'
//           style={{ display: 'inline-block', width: 'calc(50%)', position:'absolute',top:-30,left:167}}
//           rules={[{ required: true, message: 'Province is required' }]}
//         >
//           <Input placeholder="Type" />
//         </Form.Item>
//     </Form.Item>

//     <Form.Item >
//       <Form.Item name="detail"
//         style={{ display: 'inline-block', width: 'calc(100%)', position:'absolute',top:-45}}>
//         <Input.TextArea rows={4} placeholder="detail" />
//       </Form.Item>
//     </Form.Item>


//     <Form.Item label=" " colon={false}>
//       <Button type="primary" htmlType="submit" style={{ display: 'inline-block', width: 'calc(30%)', position:'absolute',top:10,left:-50}}>
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//   </div>
// );

// export default Edit;