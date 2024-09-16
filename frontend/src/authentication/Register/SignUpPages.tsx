import {
  Button,
  Card,
  Form,
  Input,
  message,
  Flex,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Select,
} from "antd";

import { useNavigate } from "react-router-dom";

import { CreateEmployee } from "../../employee/services/https";

import { EmployeeInterface } from "../../employee/interfaces/IEmployee";

import logo from "../../assets/logo.png";
import './index.css'

function SignUpPages() {
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: EmployeeInterface) => {
    const res = await CreateEmployee(values);

    if (res.status == 201) {
      messageApi.open({
        type: "success",

        content: res.data.message,
      });

      setTimeout(function () {
        navigate("/");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",

        content: res.data.error,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div className="page-signUp">
        <Flex justify="center" align="center" className="login">
          <Card className="card-login" style={{ width: 600 }}>
            <Row align={"middle"} justify={"center"}>
              <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                <img
                  alt="logo"
                  src={logo}
                  className="images-logo"
                  style={{ width: "200px", height: "auto" }}
                />
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{display:"flex",flexDirection:"column" ,alignItems:"center", justifyContent:"center" }}>
                <h2 className="header">Sign Up</h2>

                <Form
                  name="basic"
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                  style={{width: "95%", height: "auto", borderRadius:0, boxShadow:'none'}}
                >
                  <Row gutter={[16, 0]} align={"middle"}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="First name"
                        name="first_name"
                        rules={[
                          {
                            required: true,

                            message: "กรุณากรอกชื่อ !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="Last name"
                        name="last_name"
                        rules={[
                          {
                            required: true,

                            message: "กรุณากรอกนามสกุล !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            type: "email",

                            message: "รูปแบบอีเมลไม่ถูกต้อง !",
                          },

                          {
                            required: true,

                            message: "กรุณากรอกอีเมล !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,

                            message: "กรุณากรอกรหัสผ่าน !",
                          },
                        ]}
                      >
                        <Input.Password />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        label="Birthday "
                        name="birthday"
                        rules={[
                          {
                            required: true,

                            message: "กรุณาเลือกวัน/เดือน/ปี เกิด !",
                          },
                        ]}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        label="Gender"
                        name="gender_id"
                        rules={[
                          {
                            required: true,

                            message: "กรุณาเลือกเพศ !",
                          },
                        ]}
                      >
                        <Select
                          defaultValue=""
                          style={{ width: "100%" }}
                          options={[
                            { value: "", label: "กรุณาเลือกเพศ", disabled: true },

                            { value: 1, label: "Male" },

                            { value: 2, label: "Female" },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          style={{ marginRight: 5 }}
                        >
                          Sign up
                        </Button>
                        Or <a onClick={() => navigate("/")}>signin now !</a>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Card>
        </Flex>
      </div>
    </>
  );
}

export default SignUpPages;
