import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, DatePicker, Select, message, Row, Col, Space, Upload, Modal } from "antd";
import { EmployeeInterface } from "./interfaces/IEmployee";
import { PositionInterface } from "./interfaces/IPosition";
import { UpdateEmployee, GetPositions, GetEmployeeById } from "./services/https";
import dayjs from "dayjs";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";

const { Option } = Select;

export default function UsersUpdate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [employee, setEmployee] = useState<EmployeeInterface>();
  const [positions, setPositions] = useState<PositionInterface[]>([]);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { id } = useParams();
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const location = useLocation();
  const [employeeData, setEmployeeData] = useState<EmployeeInterface | null>(null);

  const onFinish = async (values: EmployeeInterface) => {
    const updatedEmployee = {
      ...employee,
      ...values,
      Date_of_Birth: values.Date_of_Birth ? dayjs(values.Date_of_Birth).toISOString() : "",
      PositionID: Number(values.PositionID),
      Profile: fileList.length > 0 && fileList[0].thumbUrl ? fileList[0].thumbUrl : employee?.Profile || "",
    };
  
    delete updatedEmployee.Position;
  
    if (newPassword) {
      updatedEmployee.Password = newPassword;
    } else {
      updatedEmployee.Password = "";
    }
  
    console.log("Updated employee before API call: ", updatedEmployee);
    try {
      const res = await UpdateEmployee(Number(id), updatedEmployee);
      if (res) {
        // Update localStorage with the new employee data
        if (employeeData?.ID == updatedEmployee.ID) {
          console.log("employeeData id: ", employeeData?.ID)
          console.log("updatedEmployee id: ", updatedEmployee.ID)
          localStorage.setItem("employeeData", JSON.stringify(updatedEmployee));
        }else {
          console.log("no change employee !!!")
          localStorage.setItem("employeeData", JSON.stringify(employeeData));
        }
        
        messageApi.success("Update successful!");
        setTimeout(() => {
          navigate("/login/employee");
          window.location.reload()
        }, 2000);
      } else {
        messageApi.error("Update failed!");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      messageApi.error("An error occurred while updating the data!");
    }
  };
  

  const getPositions = async () => {
    try {
      const res = await GetPositions();
      if (res) {
        setPositions(res);
      }
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };

  const getUserById = async () => {
    try {
      const res = await GetEmployeeById(Number(id));
      localStorage.setItem("employeeData", JSON.stringify(res));
      if (res) {
        setEmployee(res);
        form.setFieldsValue({
          FirstName: res.FirstName,
          LastName: res.LastName,
          Gender: res.Gender,
          Email: res.Email,
          Date_of_Birth: dayjs(res.Date_of_Birth),
          PositionID: res.PositionID,
        });

        setFileList(res.Profile ? [{ uid: '-1', name: 'profile-image', url: res.Profile }] : []);
      }
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  useEffect(() => {
    const storedEmployeeData = localStorage.getItem("employeeData");
    if (location.state?.employeeData) {
      setEmployeeData(location.state.employeeData);
    } else if (storedEmployeeData) {
      setEmployeeData(JSON.parse(storedEmployeeData));
    }

    getPositions();
    getUserById();
  }, [id]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleResetPassword = () => {
    setResetModalVisible(true);
  };

  const handleOk = () => {
    setResetModalVisible(false);
    // หากต้องการรีเซ็ตรหัสผ่านใหม่ สามารถทำได้ที่นี่
    // เช่น ตรวจสอบว่ารหัสผ่านใหม่ไม่ว่างเปล่า
    if (newPassword) {
      messageApi.success("Password reset successfully!");
      // ที่นี่คุณสามารถทำการบันทึกรหัสผ่านใหม่ได้
    } else {
      messageApi.error("Please enter a new password!");
    }
  };

  const handleCancel = () => {
    setResetModalVisible(false);
  };

  return (
    <React.Fragment>
      {contextHolder}
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ boxShadow: "none", borderRadius: 0 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                label="Profile Picture"
                name="Profile"
                valuePropName="fileList"
              >
                <ImgCrop rotationSlider>
                  <Upload
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture-card"
                  >
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  </Upload>
                </ImgCrop>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="First Name"
                name="FirstName"
                rules={[{ required: true, message: "Please enter your first name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Last Name"
                name="LastName"
                rules={[{ required: true, message: "Please enter your last name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Email"
                name="Email"
                rules={[{ type: "email", message: "Invalid email format!" }, { required: true, message: "Please enter your email!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Password"
                name="Password"
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Date of Birth"
                name="Date_of_Birth"
                rules={[{ required: true, message: "Please select your date of birth!" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Gender"
                name="Gender"
                rules={[{ required: true, message: "Please specify your gender!" }]}
              >
                <Select allowClear>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label="Position"
                name="PositionID"
                rules={[{ required: true, message: "Please select a position!" }]}
              >
                <Select allowClear>
                  {positions.map((position) => (
                    <Option value={position.ID} key={position.ID}>
                      {position.Position_Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col>
              <Form.Item>
                <Space>
                <Button type="danger" onClick={handleResetPassword} style={{ borderColor: 'red', color: 'red' }}>
                    Reset Password
                  </Button>
                  <Button onClick={() => navigate("/login/employee")} htmlType="button">
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Confirm
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Modal
          title="Reset Password"
          visible={resetModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input.Password
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Modal>
      </Container>
    </React.Fragment>
  );
}
