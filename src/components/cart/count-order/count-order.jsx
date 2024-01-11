import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import css from './count-order.module.scss';
import { countOrderCost } from '../../../utils/functions';
import { changeIsCartOpen } from '../../../store/modules/openings-slice';
import Button from '../../button/button';

export default function CountOrder({ cartProducts }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const sum = countOrderCost(cartProducts);
  return (
    <>
      {cartProducts?.length > 0 && (
        <div className={css.containerCount}>
          <div className={css.card}>
            <div className={css.receiptSum}>
              <div className={css.title}>Final cost</div>
              <div className={css.sum}>{sum}₴</div>
            </div>
            <div className={css.submitBtnContainer}>
              <Button
                onClick={() => {
                  router.push('/checkout');
                  dispatch(changeIsCartOpen(false));
                }}
                fontSize="fontP"
                isWide
                text="Go to checkout"
              />
            </div>
          </div>
        </div>
      )}
      {cartProducts?.length === 0 && <p>Cart is empty!</p>}
    </>
  );
}
