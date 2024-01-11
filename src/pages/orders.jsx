/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '../components/button/button';
import { useLazyGetOrderQuery } from '../store/modules/local-api-slice';
import css from '../styles/pageStyles/orders.module.scss';

export default function Orders() {
  const [inputId, setInputId] = useState();

  const [getOrder, { data: orderData }] = useLazyGetOrderQuery();

  const handleClick = () => {
    getOrder(inputId);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const countProductCost = (quantity, price) => {
    const cost = quantity * price;
    return cost;
  };

  return (
    <div className={css.container}>
      <div className={css.inputWrap}>
        <input
          type="text"
          placeholder="Type order id here..."
          onChange={(event) => {
            setInputId(event.target.value);
          }}
          onKeyDown={(event) => {
            handleKeyDown(event);
          }}
        />
        <div className={css.btnWrap}>
          <Button
            onClick={handleClick}
            width="widthM"
            fontSize="fontP"
            text="Find!"
            type="button"
          />
        </div>
      </div>

      {orderData && (
        <div className={css.orderInfoWrap}>
          <table>
            <thead className={css.redHeader}>
              <tr>
                <th colSpan="2">Order ID: {orderData._id}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User ID:</td>
                <td>{orderData.cart.userId}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  {orderData.personalData.firstName}{' '}
                  {orderData.personalData.lastName}
                </td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{orderData.personalData.email}</td>
              </tr>
              <tr>
                <td>Delivery address:</td>
                <td>{orderData.personalData.deliveryAddress}</td>
              </tr>
              <tr>
                <td>Phone number:</td>
                <td>{orderData.personalData.phoneNumber}</td>
              </tr>
              <tr>
                <td>Comment:</td>
                <td>{orderData.personalData.comment}</td>
              </tr>
              <tr>
                <td>Total const:</td>
                <td>{orderData.personalData.totalCost}$</td>
              </tr>
              <tr>
                <td>Products quantity:</td>
                <td>{orderData.personalData.productsQuantity}</td>
              </tr>
            </tbody>
            <thead className={css.greyHeader}>
              <tr>
                <th colSpan="2">Products</th>
              </tr>
            </thead>

            {orderData.cart.products.map((element) => (
              <tbody key={element._id}>
                <tr className={css.title}>
                  <td>Title:</td>
                  <td>{element.info.title}</td>
                </tr>
                <tr>
                  <td>Quantity:</td>
                  <td>{element.quantity}</td>
                </tr>
                <tr>
                  <td>Cost:</td>
                  <td>
                    {countProductCost(element.quantity, element.info.price)}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
