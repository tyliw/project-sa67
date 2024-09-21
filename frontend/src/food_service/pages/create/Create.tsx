import React, { useState, useEffect } from 'react';
import { Space, Button, Col, Row, Divider, Form, Input, Card, message,Select, InputNumber, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { MenuInterface } from "../../interfaces/IMenu";
import { CreateMenu } from '../../services/https/MenuAPI';
import { GetMeals } from '../../services/https/MealAPI';
import { GetFoodCategories } from '../../services/https/FoodCategoryAPI';
import { MealInterface } from '../../interfaces/IMeal';
import { FoodCategoryInterface } from '../../interfaces/IFoodCategory';
import './index.css';

const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const Create: React.FC = () => {
    const [meals, setMeals] = useState<MealInterface[]>([]);
    const [foodCategories, setFoodCategories] = useState<FoodCategoryInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const navigate = useNavigate();

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
        src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj as FileType);
            reader.onload = () => resolve(reader.result as string);
        });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = async (values: MenuInterface) => {
        console.log("Data sent to API for create:", values);
    
        // ตรวจสอบว่ามีไฟล์ใน fileList หรือไม่
        if (fileList.length > 0 && fileList[0].thumbUrl) {
            values.ImageMenu = fileList[0].thumbUrl;
        } else {
            values.ImageMenu = ""; // กำหนดเป็นค่าสตริงเปล่าหากไม่มีไฟล์
        }
    
        try {
            const res = await CreateMenu(values);
            console.log("API Created:", res);
            if (res) {
                // แสดงข้อความสำเร็จ
                messageApi.open({
                    type: "success",
                    content: "Data saved successfully",
                });
                // นำทางไปยังหน้าที่ต้องการหลังจากความล่าช้าสั้น ๆ เพื่อให้ข้อความเห็น
                setTimeout(() => navigate('/login/manage-data'), 500);
            } else {
                messageApi.open({
                    type: "error",
                    content: "Error !",
                });
            }
        } catch (error) {
            console.error("Error saving data:", error);
            messageApi.open({
                type: "error",
                content: "Error !",
            });
        }
    };

    const fetchMeals = async () => {
        try {
            const response = await GetMeals();
            console.log("Fetched meal data:", response);
            if (Array.isArray(response.data)) {
                setMeals(response.data);
            } else {
                console.error("Data fetched is not an array:", response);
                setMeals([]);
            }
        } catch (error) {
            console.error("Error fetching meal data:", error);
        }
    };

    const fetchFoodCategories = async () => {
        try {
            const response = await GetFoodCategories();
            console.log("Fetched food category data:", response);
            if (Array.isArray(response.data)) {
                setFoodCategories(response.data);
            } else {
                console.error("Data fetched is not an array:", response);
                setFoodCategories([]);
            }
        } catch (error) {
            console.error("Error fetching food category data:", error);
        }
    };

    useEffect(() => {
        fetchMeals();
        fetchFoodCategories();
    }, []);
    

    
    return (
        <div className='create-page'>
            {contextHolder}
            <Col span={12}>   
                <h2 className='create-card-header'>Add Menu</h2>
            </Col>
            <Card className='create-card' style={{ padding: '0px' }}>
                <Divider />
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className='create-form'
                    style={{ boxShadow: "none", borderRadius: 0 }}
                >   
                    <Row gutter={20} justify="start" style={{ width: '100%' }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                            label="Image Menu"
                            name="ImageMenu"
                            valuePropName="fileList"
                            >
                                <ImgCrop rotationSlider>
                                    <Upload
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                        beforeUpload={(file) => {
                                        setFileList([...fileList, file]);
                                        return false;
                                        }}
                                        maxCount={1}
                                        multiple={false}
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
                    </Row>           
                    <Row gutter={20} justify="start" style={{ width: '100%' }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="Menu List"
                                name="MenuList"
                                rules={[{ required: true, message: "Please enter a menu name !" }]}
                            >
                                <Input placeholder="Enter menu name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="Price"
                                name="Price"
                                rules={[
                                    { required: true, message: "Please enter a price !" },
                                    { type: 'number', message: 'Please enter a valid number!', transform: value => Number(value) },
                                ]}
                            >
                                <InputNumber 
                                    min={0} 
                                    style={{ width: '100%' }} 
                                    placeholder="Enter price"
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                label="Description"
                                name="Description"
                                rules={[{ required: true, message: "Please enter a description !" }]}
                            >
                                <Input placeholder="Enter description" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                name="MealID"
                                label="Meal"
                                rules={[{ required: true, message: "Please specify the meal !" }]}
                            >
                                <Select placeholder="Select a meal" allowClear>
                                    {meals.map((item) => (
                                        <Option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                            <Form.Item
                                name="FoodCategoryID"
                                label="Food Category"
                                rules={[{ required: true, message: "Please specify the Category !" }]}
                            >
                                <Select placeholder="Select a category" allowClear>
                                    {foodCategories.map((item) => (
                                        <Option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row justify="end">
                        <Col style={{ marginTop: "40px" }}>
                            <Form.Item>
                                <Space>
                                    <Button onClick={() => navigate('/login/manage-data')} style={{ marginRight: "10px" }}>
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
};

export default Create;
