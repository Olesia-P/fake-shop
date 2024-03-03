/* eslint-disable no-useless-escape */
import { useEffect, useState, React } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import css from '../styles/pageStyles/checkout.module.scss';
import CheckoutInput from '../components/checkout-input/checkout-input';
import {
  useGetSpecificCartQuery,
  useAddOrderMutation,
} from '../store/modules/local-api-slice';
import { countProductsQuantity, countOrderCost } from '../utils/functions';
import Button from '../components/button/button';

export default function Checkout() {
  const { catalogFilters } = useSelector(({ catalog }) => catalog);
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  // userId is created on load in Layout from cookie or fresh

  const { data: cartData } = useGetSpecificCartQuery(userId, {
    skip: userId === null,
    // not to get 500 error on the load when userId is null on load
  });
  const [addOrder, { isSuccess, isLoading }] = useAddOrderMutation();

  const router = useRouter();

  const productsQuantity = countProductsQuantity(cartData?.products);
  const total = countOrderCost(cartData?.products);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    deliveryAddress: '',
    phoneNumber: '',
    comment: '',
    totalCost: total,
    productsQuantity,
  });

  const fullOrderInfo = {
    cart: cartData,
    personalData: formData,
  };

  const numberPattern = /^[0-9[\-\(\)\s+]]*$/;
  const namePattern = /^[a-zA-Z.[\-]\s]*$/;
  const emailPattern = /^[a-zA-Z0-9.[_+\-]]+@[a-zA-Z0-9.[\-]]+\.[a-zA-Z]{2,}$/;

  const formFields = [
    {
      label: 'First name*',
      type: 'text',
      state: formData.firstName,
      name: 'firstName',
      required: true,
      errorMessage: 'Use English letters, hyphens, spaces and dots only.',
      pattern: `${namePattern.source}`,
    },
    {
      label: 'Last name*',
      type: 'text',
      state: formData.lastName,
      name: 'lastName',
      required: true,
      errorMessage: 'Use English letters, hyphens, spaces and dots only.',
      pattern: `${namePattern.source}`,
    },
    {
      label: 'Email*',
      type: 'text',
      state: formData.email,
      name: 'email',
      required: true,
      errorMessage: 'Use a valid email.',
      pattern: `${emailPattern.source}`,
    },
    {
      label: 'Delivery address*',
      type: 'text',
      state: formData.deliveryAddress,
      name: 'deliveryAddress',
      required: true,
      errorMessage: 'This field is required.',
    },
    {
      label: 'Phone number*',
      type: 'text',
      state: formData.phoneNumber,
      name: 'phoneNumber',
      required: true,
      errorMessage: 'Use a valid phone number.',
      pattern: `${numberPattern.source}`,
    },
    {
      label: 'Comment',
      type: 'text',
      state: formData.comment,
      name: 'comment',
      required: false,
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    addOrder(fullOrderInfo);
  };

  useEffect(() => {
    if (
      cartData?.products.length === 0 ||
      cartData?.products.length === undefined
    ) {
      router.push(`catalog/?sort=${catalogFilters.alphabet}`);
    }
  }, []);
  // sends back to catalog if there are no products in the cart

  useEffect(() => {
    isSuccess && router.push('/finished-order');
  }, [isSuccess]);

  return (
    <>
      <div className={css.title}>Checkout</div>
      <form className={css.container} onSubmit={(event) => handleSubmit(event)}>
        <div className={css.orderForm}>
          <div className={css.personalInfoHeader}>Delivery information:</div>
          <div className={css.personalInfo}>
            {formFields.map((element) => (
              <div className={css.inputWrap} key={element.label}>
                <CheckoutInput {...element} onChange={handleInputChange} />
              </div>
            ))}
          </div>
          <div className={css.productsList}>
            <div className={css.productListHeader}>In your order:</div>
            {cartData?.products.map((element) => (
              <div
                key={element.info.id}
                className={css.product}
                onClick={() => router.push(`/products/${element.info.id}`)}
              >
                <div className={css.img}>
                  <img src={element.info.image} alt={element.info.title} />
                </div>
                <div className={css.productName}>{element.info.title}</div>
                <div className={css.productInfo}>
                  <div className={css.counter}>
                    Quantity: {element.quantity}
                  </div>

                  <div className={css.price}>
                    Price: {(element.info.price * 1).toFixed(2)}$
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={css.orderFinalInfo}>
          <div className={css.productsQuantity}>
            Products quantity: <strong>{productsQuantity}</strong>.
          </div>
          <div className={css.total}>
            Total: <strong>{total}$</strong>
          </div>

          <Button
            isFetching={isLoading}
            isDisabled={isLoading}
            width="widthL"
            type="submit"
            onClick={null}
            text="Submit order"
            fontSize="fontHeader"
          />
        </div>
      </form>
    </>
  );
}
