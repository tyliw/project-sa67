import React, { useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CustomersInterface } from "../booking/interfaces/ICustomer";
import { CreateCustomer} from "../booking/services/https";
import { useNavigate } from "react-router-dom";
function CustomerCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();  // Initialize the form instance
  const onFinish = async (values: CustomersInterface) => {
    const res = await CreateCustomer(values);
    
    console.log(res);
    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields();  // Reset form fields after success
      setTimeout(function () {
        
      }, 2000);
      navigate("/login/room");
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
  };
  useEffect(() => {
  }, []);
  return (
    <div>
      {contextHolder}
      <Card>
        <h2 style={{fontSize:"26px"}}> Add Customer</h2>
        <Divider />
        <Form
          form={form}  // Link the form instance
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Email"
                name="Email"
                rules={[
                  {
                    type: "email",
                    message: "The email format is incorrect !",
                  },
                  {
                    required: true,
                    message: "Please enter your email !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Address"
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your address !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="Phone Number"
                name="PhoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number !",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits only !",
                  },
                ]}
              >
                <Input maxLength={10} placeholder="Enter phone number (10 digits)" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button 
                    htmlType="button" 
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    Submit
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      
      </Card>
  </div>
  );
}

export default CustomerCreate;
