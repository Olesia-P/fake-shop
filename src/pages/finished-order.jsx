import { useEffect, React } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDeleteProductOrAllProductsInCartMutation } from '../store/modules/local-api-slice';
import Button from '../components/button/button';
import css from '../styles/pageStyles/finished-order.module.scss';

export default function FinishedOrder() {
  const { lastOrderId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  // lastOrderId is set in local-api-slice.js (redux)
  // after the successful submission of the order
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const { orderId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const [deleteProducts] = useDeleteProductOrAllProductsInCartMutation();

  const router = useRouter();

  useEffect(() => {
    if (lastOrderId === '') {
      router.push('/catalog');
    }
  }, []);
  // lastOrderId is cleaned outside this page in Layout
  // this action is made to prohibit visiting this page voluntarily

  useEffect(() => {
    deleteProducts({ userId });
  }, []);
  // to clean the cart

  return (
    <div className={css.container}>
      <div className={css.messageWrap}>
        <div className={css.message}>
          <div>Thank you for your order!</div>
          <div>But we will never send it to you.</div>
          <div>It&apos;s a fake shop after all!</div>
          <br />
          <div
            onClick={() => {
              router.push(`/orders/?orderId=${orderId}`);
            }}
            className={css.orderId}
          >
            Your order ID: <strong>{lastOrderId}</strong>{' '}
          </div>
          <div>
            You can use it to find your order information in the{' '}
            <strong>&apos;Orders&apos;</strong> tab.
          </div>
        </div>
        <div className={css.btn}>
          <Button
            width="widthL"
            type="submit"
            onClick={() => {
              router.push('/catalog');
            }}
            text="Back to shopping"
            fontSize="fontP"
          />
        </div>
      </div>
    </div>
  );
}
