import { Moment } from "moment";
import { BookingInterface } from "../../interface/IBooking";


const apiUrl = "http://localhost:8000";

async function GetBooking() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let res = await fetch(`${apiUrl}/bookingMeetingRoom`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}
//Delet customer by id
async function DeleteBookingByID(id: number | undefined): Promise<boolean> {
  if (id === undefined) {
    throw new Error('ID is undefined');
  }

  const requestOptions = {
    method: 'DELETE',
  };

  try {
    const response = await fetch(`${apiUrl}/bookingMeetingRoom/${id}`, requestOptions);

    if (response.ok) { // response.ok is true for status codes in the range 200-299
      return true;
    } else {
      // Handle non-success responses
      const errorText = await response.text();
      console.error(`Failed to delete booking: ${response.status} ${errorText}`);
      return false;
    }
  } catch (error) {
    // Handle network errors or other unexpected errors
    console.error('An error occurred while deleting booking:', error);
    return false;
  }
}

async function GetBookingById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/bookingMeetingRoom/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}
async function GetBookingMeetingRoomById(id: number | undefined){

  const requestOptions = {
    method: "GET",
  };

  try {
    const response = await fetch(`${apiUrl}/bookingMeetingRoom/Room/${id}`, requestOptions);

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`Failed to fetch: ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error("Error fetching booking:", error);
    throw error; // Re-throw the error for further handling if necessary
  }
}


async function CreateBooking(data: BookingInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    try {
      const response = await fetch(`${apiUrl}/bookingMeetingRoom`, requestOptions);
      if (response.ok) {
        return await response.json(); 
      } else {
        const errorText = await response.text(); 
        console.error(`Error: ${response.status} - ${errorText}`);
        return false;
      }
    } catch (error) {
      console.error('Network error:', error);
      return false;
    }
}
  

async function UpdateBooking(data: BookingInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/bookingMeetingRoom`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}

export {
  GetBooking,
  GetBookingById,
  DeleteBookingByID,
  UpdateBooking,
  CreateBooking,
  GetBookingMeetingRoomById
};