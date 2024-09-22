


const apiUrl = "http://localhost:8000";

async function GetMostMenus() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/get_most_purchased_menu`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
  }


async function GetListOrderPerDay() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  let res = await fetch(`${apiUrl}/orders_per_day`, requestOptions)
    .then((res) => {
      if (res.status == 200) {
        return res.json();
      } else {
        return false;
      }
    });

  return res;
}
async function GetListRoomPerDay() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/rooms_per_day`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetListBookingPricePerDay() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    let res = await fetch(`${apiUrl}/booking_price_per_day`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetListPeoplePerDay() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/peoples_per_day`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetListMeeintgRoomsPerDay() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/meeting_room_per_day`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}
async function GetListPaymentsPerDay() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/payments_per_day`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}
async function GetListPaymentsPerMonth() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/payments_per_month`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}


async function GetListPeoPlePerMonth() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/peoples_per_month`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetListRoomTypePercent() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/room_type_percent`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetListMeetingRoomPerMonth() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/meeting_room_per_month`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}
async function GetListOrderPerMonth() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/order_per_month`, requestOptions)
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          return false;
        }
      });
  
    return res;
}

async function GetListBookingPerMonth() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let res = await fetch(`${apiUrl}/booking_per_month`, requestOptions)
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
    GetListOrderPerDay,
    GetListPeoplePerDay,
    GetListRoomPerDay,
    GetListPaymentsPerDay,
    GetListPaymentsPerMonth,
    GetListPeoPlePerMonth,
    GetListRoomTypePercent,
    GetListMeetingRoomPerMonth,
    GetListOrderPerMonth,
    GetListBookingPerMonth,
    GetListMeeintgRoomsPerDay,
    GetListBookingPricePerDay,
    GetMostMenus,
};