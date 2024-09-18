import React from 'react';
import { ItemInterface } from '../listMenu/FoodList';
import './index.css';

interface FormProps {
  onOrder: () => void;
  selectedItems: ItemInterface[];
  onClearSelection: () => void;
  bookingID: number | null;
}

const Form: React.FC<FormProps> = ({ onOrder, selectedItems, onClearSelection }) => {
  const Total = selectedItems
    .reduce((acc, item) => acc + item.amount * item.Price, 0)
    .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleOrder = (event: React.FormEvent) => {
    event.preventDefault();
    onOrder();
  };

  const handleClear = () => {
    onClearSelection();
  };

  console.log("selectedItems for form: ", selectedItems);

  return (
    <div className='form-page'>
      <form onSubmit={handleOrder}>
        <div className='selected-header'>Selected Menu</div>

        <div className="cart-items">
          {selectedItems.length === 0 ? (
            <p>No items selected.</p>
          ) : (
            <table className='selectedItem'>
              <thead>
                <tr>
                  <th> No. </th>
                  <th> Item </th>
                  {/* <td> Meal. </td> */}
                  <th> Qty. </th>
                  <th> Price </th>
                  <th> Amount </th>
                </tr>
              </thead>
              {selectedItems.map((item, index) => (
                <tbody key={item.ID}>
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.MenuList}</td>
                    {/* <td>{item.Meal?.Name}</td> */}
                    <td>{item.amount}</td>
                    <td>{item.Price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>{(item.amount * item.Price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ฿</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>

        <div className='button-footer'>
          {selectedItems.length > 0 && (
            <div className="total-amount">
              <h2>Total: {Total} ฿</h2>
              <button type="submit" className='submit-button'>ORDER</button>
            </div>
          )}
          <button type="button" className='clear-button' onClick={handleClear}>CLEAR</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
