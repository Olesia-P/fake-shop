import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import css from './countOrder.module.scss';
import { countOrderCost } from '../../../utils/functions';
import { useGetCartQuery } from '../../../store/modules/localApiSlice';
import { changeIsCartOpen } from '../../../store/modules/openingsSlice';
import Button from '../../button/button';

export default function CountOrder() {
  const dispatch = useDispatch();

  const { data: localApiCartData } = useGetCartQuery();

  const router = useRouter();

  const sum = countOrderCost(localApiCartData);
  return (
    <>
      {localApiCartData?.length > 0 && (
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
      {localApiCartData?.length === 0 && <p>Cart is empty!</p>}
    </>
  );
}
