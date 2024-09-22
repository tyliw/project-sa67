import React from 'react';
import { CustomerInterface } from "../../../interface/ICustomer"; // Adjust the path as necessary

interface Props {
  customer: CustomerInterface;
}

const CustomerID: React.FC<Props> = ({ customer }) => {
  return (
    <div>
      {customer.ID}
    </div>
  );
};

export default CustomerID;
