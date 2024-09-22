import { CustomerInterface } from "../../interface/ICustomer";


const apiUrl = "http://localhost:8000";

async function GetCustomer() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/customerMeetingRoom`, requestOptions)
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
async function DeleteCustomerByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };
  let res = await fetch(`${apiUrl}/customerMeetingRoom/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return true;
      } else {
        return false;
      }
    });

  return res;
}

async function GetCustomerById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/customerMeetingRoom/${id}`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}


async function CreateCustomer(data: CustomerInterface) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(`${apiUrl}/customerMeetingRoom`, requestOptions);
    if (response.ok) { 
      const result = await response.json();
      console.log("CreateCustomer response:", result); // Debug line
      return result; // Ensure this contains the ID
    } else {
      const errorText = await response.text();
      console.error(`Error: ${response.status} - ${errorText}`);
      return null;
    }
  } catch (error) {
    console.error('Network error:', error);
    return null;
  }
}



async function UpdateCustomer(data: CustomerInterface) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };

  let res = await fetch(`${apiUrl}/customerMeetingRoom`, requestOptions)
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
  GetCustomer,
  GetCustomerById,
  DeleteCustomerByID,
  UpdateCustomer,
  CreateCustomer,
};