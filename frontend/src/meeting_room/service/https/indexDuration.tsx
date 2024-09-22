import { Moment } from "moment";
import { BookingInterface } from "../../interface/IBooking";


const apiUrl = "http://localhost:8000";

async function GetDuration() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/duration`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

async function GetDurationByDate(Date: String | undefined) {
    const requestOptions = {
      method: "GET"
    };
  
    try {
      const res = await fetch(`${apiUrl}/bookingMeetingRoom/Date?date_time=${Date}`, requestOptions);
  
      // Check if response status is 204 (No Content)
      if (res.status === 204) {
        return [];
      }
  
      if (res.status === 200) {
        const data = await res.json();
        return data;
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  
  
  

export {
  GetDuration,
  GetDurationByDate,
};