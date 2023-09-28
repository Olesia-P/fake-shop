import { useEffect, React } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosBasket } from 'react-icons/io';
import cx from 'classnames';
import css from './cart.module.scss';
import { changeIsCartOpen } from '../../store/modules/openings-slice';
import CartProduct from './cart-product/cart-product';
import CountOrder from './count-order/count-order';
import { useGetCartQuery } from '../../store/modules/local-api-slice';
import useClickOutsideClose from '../../hooks/use-click-outside-close';

export default function Cart() {
  const { isCartOpen } = useSelector(({ openings }) => openings);
  const { data: localApiCartData } = useGetCartQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  const changeIsCartOpenWithDispatch = (value) => {
    dispatch(changeIsCartOpen(value));
  };

  useEffect(() => {
    if (router.pathname === '/checkout') dispatch(changeIsCartOpen(false));
  }, [isCartOpen]);

  const ref = useClickOutsideClose(changeIsCartOpenWithDispatch, isCartOpen);
  return (
    <div className={css.container} ref={ref}>
      <div
        className={css.cartIcon}
        onClick={() => {
          dispatch(changeIsCartOpen(!isCartOpen));
        }}
      >
        <IoIosBasket />
      </div>
      <div
        className={css.itemCounter}
        onClick={() => dispatch(changeIsCartOpen(!isCartOpen))}
      >
        {localApiCartData?.length}
      </div>
      <div
        className={cx(
          css.cart,
          isCartOpen && css.open,
          localApiCartData?.length === 0 && css.noScroll,
        )}
      >
        <div className={css.header}>In your cart</div>
        <CartProduct cartProducts={localApiCartData} />
        <CountOrder />
      </div>
    </div>
  );
}
