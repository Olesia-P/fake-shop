import { useEffect, React } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosBasket } from 'react-icons/io';
import cx from 'classnames';
import css from './cart.module.scss';
import { changeIsCartOpen } from '../../store/modules/openings-slice';
import CartProduct from './cart-product/cart-product';
import CountOrder from './count-order/count-order';
import { useLazyGetSpecificCartQuery } from '../../store/modules/local-api-slice';
import useClickOutsideClose from '../../hooks/use-click-outside-close';

export default function Cart() {
  const { isCartOpen } = useSelector(({ openings }) => openings);
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  // in Layout on load userId is created/taken from cookie
  const { isCartCreated } = useSelector(({ mixedPurpose }) => mixedPurpose);
  // in Layout on load cart is loaded/created and isCartCreated is set

  const [getSpecificCart, { data: cartData }] = useLazyGetSpecificCartQuery();

  useEffect(() => {
    if (isCartCreated && userId !== null) {
      getSpecificCart(userId);
      //  not to load the cart without needed info for query
    }
  }, [isCartCreated, userId]);

  const dispatch = useDispatch();
  const router = useRouter();

  const changeIsCartOpenWithDispatch = (value) => {
    dispatch(changeIsCartOpen(value));
  };

  useEffect(() => {
    if (router.pathname === '/checkout') dispatch(changeIsCartOpen(false));
    // to forbid editing cart at checkout stage
  }, [isCartOpen]);

  const ref = useClickOutsideClose(changeIsCartOpenWithDispatch, isCartOpen);
  // to close cart if user clicked the area outside cart

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
        {cartData?.products.length}
      </div>
      <div
        className={cx(
          css.cart,
          isCartOpen && css.open,
          cartData?.products.length === 0 && css.noScroll,
        )}
      >
        <div className={css.header}>In your cart</div>
        <CartProduct cartProducts={cartData?.products} />
        <CountOrder cartProducts={cartData?.products} />
      </div>
    </div>
  );
}
