import { useEffect, React } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Button from '../components/button/button';
import css from '../styles/pageStyles/finishedOrder.module.scss';

export default function FinishedOrder() {
  const { lastOrderId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  const router = useRouter();

  useEffect(() => {
    if (lastOrderId === '') {
      router.push('/catalog');
    }
  }, []);
  return (
    <div className={css.container}>
      <div className={css.messageWrap}>
        <div className={css.message}>
          <div>Thank you for your order!</div>
          <div>Your order id: {lastOrderId} </div>
          <div>But we will never send it to you.</div>
          <div>It&apos;s a fake shop after all!</div>
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
