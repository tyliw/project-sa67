import { useState, useEffect } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Card,
  message,
  Select,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { CustomersInterface } from "../../interfaces/ICustomer";
import { BookingInterface } from "../../interfaces/IBooking";
import {
  GetTypeRooms,
  GetRooms,
  CreateBooking,
  GetCustomers,
  UpdateRoom,
} from "../../services/https";
import { useNavigate } from "react-router-dom";
import { RoomTypesInterface } from "../../interfaces/IRoomTypes";
import { RoomInterface } from "../../interfaces/IRoom";
import moment from "moment";
const { Option } = Select;
function CustomerCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [typerooms, setTypeRooms] = useState<RoomTypesInterface[]>([]);
  const [customers, setCustomers] = useState<CustomersInterface[]>([]);
  const [typeroom, setTypeRoom] = useState<number>();
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [selectRoom, setSelectRoom] = useState<number>();
  const [checkInDate, setCheckInDate] = useState<moment.Moment | null>(null); // State to store CheckIn date
  const [checkOutDate, setCheckOutDate] = useState<moment.Moment | null>(null); // State to store CheckOut date

  const [dayDifference, setDayDifference] = useState<number | null>(null); // State to store day difference
  const [totalPrice, setTotalPrice] = useState<number | null>(null); // State to store total price

  const onFinish = async (values: BookingInterface) => {
    const formattedValues: BookingInterface = {
      ...values,
      CheckIn: values.CheckIn
        ? moment(values.CheckIn).format("YYYY-MM-DD")
        : "",
      CheckOut: values.CheckOut
        ? moment(values.CheckOut).format("YYYY-MM-DD")
        : "",
    };

    // Build the bookingData object and include the calculated totalPrice
    const bookingData: BookingInterface = {
      CheckIn: values.CheckIn,
      CheckOut: values.CheckOut,
      TotalPrice: totalPrice, // Add totalPrice from the state
      CustomerID: formattedValues.CustomerID,
      RoomID: formattedValues.RoomID,
    };

    const res = await CreateBooking(bookingData);
    console.log("CreateBooking", bookingData);
    console.log(res);

    if (res) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields();

      if (res.data.ID !== undefined) {
        setTimeout(() => {
          //window.location.reload(); // Reload the page
          navigate(`/login/food-service/structure/${res.data.ID}`, {
            state: { bookingID: res.data.ID },
          });
        }, 500);
      }
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }

    // Fetch the selected room and update its status
    const selectedRoom = rooms.find((room) => room.ID === selectRoom);
    if (selectedRoom) {
      const roomUpdate: RoomInterface = {
        ...selectedRoom,
        Status: "Occupied", // update status room "Vacant" ----> "Occupied"
      };

      console.log("roomUpdate = ", roomUpdate);
      const roomPatch = await UpdateRoom(roomUpdate);
      console.log("Update Successful: ", roomPatch);
    } else {
      console.error("Selected room not found");
    }
  };

  const getTypeRooms = async () => {
    const res = await GetTypeRooms();
    if (res) {
      setTypeRooms(res);
    }
  };

  const getCustomers = async () => {
    const res = await GetCustomers();
    console.log("Customers:", res);
    if (Array.isArray(res)) {
      setCustomers(res);
    } else {
      console.error("API response is not an array");
    }
  };

  const getRooms = async () => {
    const res = await GetRooms();
    if (res) {
      setRooms(res);
      console.log(res);
    }
  };

  useEffect(() => {
    getTypeRooms();
    getRooms();
    getCustomers();
  }, []);

  // Calculate the difference between CheckIn and CheckOut dates
  const calculateDayDifference = (
    checkIn: moment.Moment | null,
    checkOut: moment.Moment | null
  ) => {
    if (checkIn && checkOut) {
      const diff = checkOut.diff(checkIn, "days");
      setDayDifference(diff);
    } else {
      setDayDifference(null);
    }
  };

  // Calculate the total price based on the selected room's price per night and day difference
  const calculateTotalPrice = (
    selectedRoomID: number | undefined,
    dayDiff: number | null
  ) => {
    const selectedRoom = rooms.find((room) => room.ID === selectedRoomID);
    if (selectedRoom && selectedRoom.RoomTypes && dayDiff !== null) {
      // Access PricePerNight from RoomTypes instead of Room
      const pricePerNight = Number(selectedRoom.RoomTypes.PricePerNight);
      const total = pricePerNight * dayDiff;
      setTotalPrice(total);
    } else {
      setTotalPrice(null);
    }
  };

  useEffect(() => {
    calculateDayDifference(checkInDate, checkOutDate);
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    calculateTotalPrice(selectRoom, dayDifference);
  }, [selectRoom, dayDifference]);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2 style={{fontSize:"26px"}}>Add Room Booking</h2>
        <Divider />
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="CustomerID"
                label="Customer Name"
                rules={[{ required: true, message: "Please select a customer name!" }]}
              >
                <Select
                  showSearch // เพื่อเปิดการค้นหาชื่อ
                  allowClear
                  placeholder="Search or select customer name"
                  optionFilterProp="children"
                  onChange={(value) => form.setFieldValue("CustomerID", value)}
                  filterOption={(input, option) =>
                    (option?.children ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {customers.map((item) => (
                    <Option value={item.ID} key={item.ID}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* เพิ่มปุ่มลิงก์ไปยังหน้าเพิ่มชื่อ */}
              <Form.Item>
                <Button type="link" href="/login/customer">
                  Add New Customer
                </Button>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item label="Check-in Date" name="CheckIn" rules={[{ required: true, message: "Please select check-in time!" }]}>
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) => {
                    return current && current < moment().startOf("day");
                  }}
                  onChange={(date) => setCheckInDate(date)} // Set check-in date when selected
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item label="Check-Out Date" name="CheckOut" rules={[{ required: true, message: "Please select check-out time!" }]}>
                <DatePicker
                  style={{ width: "100%" }}
                  disabled={!checkInDate} // Disable CheckOut field until CheckIn is selected
                  disabledDate={(current) => {
                    return (
                      current &&
                      current <=
                        (checkInDate ? checkInDate : moment().startOf("day"))
                    );
                  }}
                  onChange={(date) => setCheckOutDate(date)} // Set check-out date when selected
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="TypeRoomID"
                label="Room Type"
                rules={[{ required: true, message: "Please select the room type you wish to stay in!" }]}
              >
                <Select allowClear onChange={(value) => setTypeRoom(value)}>
                  {typerooms.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={12}>
              <Form.Item
                name="RoomID"
                label="Room Number"
                rules={[
                  { required: true, message: "Please select the room you wish to stay in!" },
                ]}
              >
                <Select allowClear onChange={(value) => setSelectRoom(value)}>
                  {rooms
                    .filter(
                      (room) =>
                        room.RoomTypes?.ID === typeroom &&
                        room.Status === "Vacant"
                    )
                    .map((item) => (
                      <Option value={item.ID} key={item.Address}>
                        {item.Address} {item.RoomTypes?.Description}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Display the difference in days */}
          {dayDifference !== null && (
            <Row gutter={[16, 16]}>
              <Col>
                <p>จำนวนวันที่เข้าพัก: {dayDifference} วัน</p>
              </Col>
            </Row>
          )}

          {/* Display the total price */}
          {totalPrice !== null && (
            <Row gutter={[16, 16]}>
              <Col>
                <p>ราคาที่ต้องชำระ: {totalPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} บาท</p>
              </Col>
            </Row>
          )}

          <Row justify="end">
            <Col>
              <Form.Item>
                <Space>
                  <Button
                    htmlType="button"
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
