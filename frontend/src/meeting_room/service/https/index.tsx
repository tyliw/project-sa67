// import { UsersInterface } from "../../interfaces/IUser";
import { MeetingInterface } from "../../interface/IMeetingRoom"


const apiUrl = "http://localhost:8000";

async function GetMeetingRooms() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/meetingRoom`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function DeleteMeetingRoomByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };
  let res = await fetch(`${apiUrl}/meetingRoom/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

async function GetMeetingRoomById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/meetingRoom/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


async function CreateMeetingRoom(data: MeetingInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/meetingRoom`, requestOptions);
    if (response.ok) { // Check if the response is successful (status code in the range 200-299)
      return await response.json(); // Return the JSON data if successful
    } else {
      // Handle other HTTP statuses
      const errorText = await response.text(); // Get the response text for debugging
      console.error(`Error: ${response.status} - ${errorText}`);
      return false;
    }
  } catch (error) {
    // Handle network errors
    console.error('Network error:', error);
    return false;
  }
}


async function UpdateMeetingRoom(data: MeetingInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const res = await fetch(`${apiUrl}/meetingRoom/${data.ID}`, requestOptions);

    // ตรวจสอบสถานะการตอบสนอง
    if (res.status === 200) {
      return await res.json();
    } else {
      return false; // ส่งกลับ false เมื่อมีสถานะไม่ใช่ 200
    }
  } catch (error) {
    console.error("Error updating meeting room:", error);
    return false; // ส่งกลับ false เมื่อเกิดข้อผิดพลาด
  }
}


export {
  GetMeetingRooms,
  GetMeetingRoomById,
  DeleteMeetingRoomByID,
  UpdateMeetingRoom,
  CreateMeetingRoom,
};