import React, { useState } from "react";
import { Button, Form, Input, Modal, message as antdMessage, Upload, Image, Row, Col } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from 'antd';
import { MeetingInterface } from "../../../interface/IMeetingRoom";
import { DeleteMeetingRoomByID, UpdateMeetingRoom } from "../../../service/https";
import { useNavigate } from 'react-router-dom';

type FileType = Parameters<UploadProps['beforeUpload']>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

interface EditPopupProps {
    room?: MeetingInterface;
    closePopup?: () => void;
    onDelete?: (roomId: number) => void;
    onSubmit?: (updatedRoom: MeetingInterface) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({ room, closePopup, onDelete }) => {
    const navigate = useNavigate();
    const [fileList, setFileList] = useState<UploadFile[]>(room?.Image ? [{ uid: '-1', name: 'Image', url: room?.Image }] : []);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
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
        setPreviewImage(src);
        setPreviewOpen(true);
    };

    const onFinish = async (values: MeetingInterface) => {
        values.ID = room?.ID;
        const capacity = parseInt(values.Capacity, 10);
        const roomSize = parseFloat(values.RoomSize);
        const airCondition = parseInt(values.AirCondition, 10);
        const chair = parseInt(values.Chair, 10);
        values.Capacity = capacity;
        values.RoomSize = roomSize;
        values.AirCondition = airCondition;
        values.Chair = chair;
        values.Image = fileList.length > 0 ? fileList[0].thumbUrl : room?.Image;
        try {
            const res = await UpdateMeetingRoom(values);
            console.log(values)
            if (res) {
                antdMessage.success("Room updated successfully.");
                navigate("/login/meeting-rooms");
                closePopup?.();
            } else {
                antdMessage.error("Failed to update room.");
            }
        } catch (error) {
            antdMessage.error("An error occurred.");
        }
    };

    const handleDelete = () => {
        if (room?.ID) {
            Modal.confirm({
                title: 'Are you sure you want to delete this room?',
                content: 'This action cannot be undone.',
                okText: 'Yes, Delete',
                cancelText: 'No, Cancel',
                onOk: async () => {
                    try {
                        const res = await DeleteMeetingRoomByID(room.ID);
                        if (res) {
                            antdMessage.success("Room deleted successfully.");
                            if (closePopup) closePopup(); 
                        } else {
                            antdMessage.error("Failed to delete room.");
                        }
                    } catch (error) {
                        antdMessage.error("An unexpected error occurred.");
                        console.error("DeleteMeetingRoomByID error:", error);
                    }
                }
            });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Form
                name="edit-form"
                onFinish={onFinish}
                initialValues={{
                    RoomName: room?.RoomName,
                    RoomSize: room?.RoomSize,
                    Capacity: room?.Capacity,
                    AirCondition: room?.AirCondition,
                    Chair: room?.Chair,
                    Type: room?.Type,
                    Detail: room?.Detail,
                }}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ width: '100%', maxWidth: 800 }}
                layout="horizontal" // เพิ่มการจัดวางแบบแนวนอน
            >
                <Form.Item
                    label="Image"
                    name="Image"
                >
                    <Upload
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                        beforeUpload={() => false}
                        maxCount={1}
                        listType="picture-card"
                    >
                        <div style={{ textAlign: 'center' }}>
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
                <Form.Item label="Room Size and Capacity " wrapperCol={{ span: 24 }}>
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

                {/* Air Condition และ Chair */}
                <Form.Item label="Air Condition and Chair" wrapperCol={{ span: 24 }}>
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
                                name='Chair'
                                label="Chair"
                                rules={[{ required: true, message: 'Chair is required' }]}
                                noStyle
                            >
                                <Input placeholder="Chair" type="number" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form.Item>

                {/* Room Type */}
                <Form.Item
                    name='Type'
                    label="Room Type"
                    rules={[{ required: true, message: 'Room Type is required' }]}
                >
                    <Input placeholder="Room Type" />
                </Form.Item>

                {/* Details */}
                <Form.Item
                    name='Detail'
                    label="Details"
                >
                    <Input.TextArea rows={4} placeholder="Details" />
                </Form.Item>

                {/* ปุ่มบันทึก, ยกเลิก, และลบ */}
                <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button type="default" onClick={closePopup} style={{ marginLeft: 10 }}>
                        Cancel
                    </Button>
                    {onDelete && (
                        <Button type="primary" danger onClick={handleDelete} style={{ marginLeft: 10 }}>
                            Delete
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditPopup;
