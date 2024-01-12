/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '../components/button/button';
import { useLazyGetOrderQuery } from '../store/modules/local-api-slice';
import css from '../styles/pageStyles/orders.module.scss';

export default function Orders() {
  const [inputId, setInputId] = useState();
  const [focused, setFocused] = useState(false);
  const [isError, setIsError] = useState(false);
  const [getOrder, { data: orderData }] = useLazyGetOrderQuery();

  const handleClick = () => {
    getOrder(inputId.trim())
      .unwrap()
      .then(() => setIsError(false))
      .catch(() => {
        setIsError(true);
      });
  };

  const countProductCost = (quantity, price) => {
    const cost = quantity * price;
    return cost;
  };

  return (
    <div className={css.container}>
      <form
        className={css.inputWrap}
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}
      >
        <input
          type="text"
          placeholder="Type order id here..."
          required
          onChange={(event) => {
            setInputId(event.target.value);
          }}
          pattern="[A-Za-z0-9]+"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          // eslint-disable-next-line react/no-unknown-property
          focused={focused.toString()}
        />
        <div className={css.inputError}>
          Use valid order ID (numbers and letters)
        </div>
        <div className={css.btnWrap}>
          <Button width="widthM" fontSize="fontP" text="Find!" type="submit" />
        </div>
      </form>

      {orderData && !isError && (
        <div className={css.orderInfoWrap}>
          <table>
            <thead className={css.redHeader}>
              <tr>
                <th colSpan="2">Order ID: {orderData?._id}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>User ID:</td>
                <td>{orderData?.cart?.userId}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>
                  {orderData?.personalData?.firstName}{' '}
                  {orderData?.personalData?.lastName}
                </td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{orderData?.personalData?.email}</td>
              </tr>
              <tr>
                <td>Delivery address:</td>
                <td>{orderData?.personalData?.deliveryAddress}</td>
              </tr>
              <tr>
                <td>Phone number:</td>
                <td>{orderData?.personalData?.phoneNumber}</td>
              </tr>
              <tr>
                <td>Comment:</td>
                <td>{orderData?.personalData?.comment}</td>
              </tr>
              <tr>
                <td>Total const:</td>
                <td>{orderData?.personalData?.totalCost}$</td>
              </tr>
              <tr>
                <td>Products quantity:</td>
                <td>{orderData?.personalData?.productsQuantity}</td>
              </tr>
            </tbody>
            <thead className={css.greyHeader}>
              <tr>
                <th colSpan="2">Products</th>
              </tr>
            </thead>

            {orderData?.cart?.products.map((element) => (
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
      {isError && (
        <div className={css.errorMessage}>
          Order was not found. Check if you provided the right order ID.{' '}
        </div>
      )}
    </div>
  );
}
