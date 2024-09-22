import React, { useState } from "react";
import { Button, Form, Input, message as antdMessage } from 'antd';
import { MeetingInterface } from "../../../interface/IMeetingRoom"; // Adjust the path as necessary
import { CreateMeetingRoom } from "../../../service/https";
import { useNavigate } from 'react-router-dom';
import { Upload } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { 
    Modal, 
    Image, 
    Row, 
    Col 
} from 'antd';
interface CreatePopupProps {
    closePopup?: () => void; 
}

const CreatePopup: React.FC<CreatePopupProps> = ({ closePopup }) => {

    const navigate = useNavigate();
    const [messageApi, contextHolder] = antdMessage.useMessage(); 
    const [fileList, setFileList] = useState<UploadFile[]>([]);
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
    
    const onFinish = async (values: MeetingInterface) => {
        const capacity = parseInt(values.Capacity, 10);
        const roomSize = parseFloat(values.RoomSize);
        const airCondition = parseInt(values.AirCondition, 10);
        const chair = parseInt(values.Chair, 10);
        values.Capacity = capacity;
        values.RoomSize = roomSize;
        values.AirCondition = airCondition;
        values.Chair = chair;
        values.Image = fileList[0].thumbUrl;
        try {
            const res = await CreateMeetingRoom(values);
            console.log(values);
            if (res) {
                messageApi.success("Room created successfully.");
                setTimeout(() => {
                    navigate("/login/meeting-rooms");
                }, 2000);
            } else {
                messageApi.error("Failed to create room.");
            }
        } catch (error) {
            messageApi.error("An unexpected error occurred.");
            console.error("CreateMeetingRoom error:", error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {contextHolder} 
            <Form
                name="create-form"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: 500 }}
            >
                {/* Image Upload */}
                <Form.Item
                    label="Image"
                    name="Image"
                >
                   
                        <Upload
                            fileList={fileList}
                            onChange={onChange}
                            beforeUpload={() => false}
                            maxCount={1}
                            listType="picture-card"
                        >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                        </Upload>
                  
                </Form.Item>

                {/* Room Name */}
                <Form.Item
                    name="RoomName"
                    label="Room Name"
                    rules={[{ required: true, message: 'Room Name is required' }]}
                >
                    <Input placeholder="Room Name" />
                </Form.Item>

                {/* Room Size และ Max People */}
                <Form.Item label="Room Details" wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="RoomSize"
                                label="Room Size"
                                rules={[{ required: true, message: 'Room Size is required' }]}
                                noStyle
                            >
                                <Input placeholder="Room Size" type="number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="Capacity"
                                label="Max People"
                                rules={[{ required: true, message: 'Max People is required' }]}
                                noStyle
                            >
                                <Input placeholder="Max People" type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                {/* Air Condition และ Room Type */}
                <Form.Item label="Additional Info" wrapperCol={{ span: 24 }}>
                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name='AirCondition'
                                label="Air Condition"
                                rules={[{ required: true, message: 'Air condition is required' }]}
                                noStyle
                            >
                                <Input placeholder="Air Condition" type="number" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name='Type'
                                label="Room Type"
                                rules={[{ required: true, message: 'Room Type is required' }]}
                                noStyle
                            >
                                <Input placeholder="Room Type" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                {/* Chair */}
                <Form.Item
                    name='Chair'
                    label="Chair"
                    rules={[{ required: true, message: 'Chair is required' }]}
                >
                    <Input placeholder="Chair" type="number" />
                </Form.Item>

                {/* Details */}
                <Form.Item
                    name='Detail'
                    label="Details"
                >
                    <Input.TextArea rows={4} placeholder="Details" />
                </Form.Item>


                <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="default" onClick={closePopup} style={{ marginLeft: 10 }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePopup;
