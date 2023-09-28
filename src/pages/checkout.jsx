/* eslint-disable no-useless-escape */
import { useEffect, useState, React } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import css from '../styles/pageStyles/checkout.module.scss';
import CheckoutInput from '../components/checkout-input/checkout-input';
import {
  useGetCartQuery,
  usePostOrderMutation,
} from '../store/modules/local-api-slice';
import { countProductsQuantity, countOrderCost } from '../utils/functions';
import Button from '../components/button/button';

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastname: '',
    email: '',
    deliveryAddress: '',
    phoneNumber: '',
    comment: '',
  });
  const { data: localApiCartData } = useGetCartQuery();
  const { catalogFilters } = useSelector(({ catalog }) => catalog);
  const router = useRouter();
  const productsQuantity = countProductsQuantity(localApiCartData);
  const total = countOrderCost(localApiCartData);
  const [postOrder, { isSuccess, isLoading }] = usePostOrderMutation();
  const fullOrderInfo = {
    cart: localApiCartData,
    id: Date.now(),
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
      errorMessage: 'Use letters, hyphens, spaces and dots only.',
      pattern: `${namePattern.source}`,
    },
    {
      label: 'Last name*',
      type: 'text',
      state: formData.lastname,
      name: 'lastname',
      required: true,
      errorMessage: 'Use letters, hyphens, spaces and dots only.',
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
    postOrder(fullOrderInfo);
  };

  useEffect(() => {
    if (
      localApiCartData?.length === 0 ||
      localApiCartData?.length === undefined
    ) {
      router.push(`catalog/?sort=${catalogFilters.alphabet}`);
    }
  }, []);

  useEffect(() => {
    isSuccess && router.push('/finished-order');
  }, [isSuccess]);

  return (
    <>
      <div className={css.title}>Checkout</div>
      <form className={css.container} onSubmit={(event) => handleSubmit(event)}>
        {/*  */}
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
            {localApiCartData?.map((element) => (
              <div
                key={element.product.id}
                className={css.product}
                onClick={() => router.push(`/products/${element.product.id}`)}
              >
                <div className={css.img}>
                  <img
                    src={element.product.image}
                    alt={element.product.title}
                  />
                </div>
                <div className={css.productName}>{element.product.title}</div>
                <div className={css.productInfo}>
                  <div className={css.counter}>
                    Quantity: {element.quantity}
                  </div>

                  <div className={css.price}>
                    Price: {element.product.price}$
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/*  */}
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
