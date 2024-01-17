import { useEffect, React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useDeleteProductOrAllProductsInCartMutation } from '../store/modules/local-api-slice';
import { changeOrderId } from '../store/modules/mixed-purpose-slice';
import Button from '../components/button/button';
import css from '../styles/pageStyles/finished-order.module.scss';

export default function FinishedOrder() {
  const { lastOrderId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const { orderId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const [deleteProducts] = useDeleteProductOrAllProductsInCartMutation();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (lastOrderId === '') {
      router.push('/catalog');
    }
  }, []);

  useEffect(() => {
    deleteProducts({ userId });
  }, []);

  useEffect(() => {
    dispatch(changeOrderId(lastOrderId));
  }, [orderId]);

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
              router.push(`/orders/?orderId=${orderId}`, undefined, {
                shallow: true,
              });
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
