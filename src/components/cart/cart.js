import css from "./cart.module.scss";
import cx from "classnames";
import { IoIosBasket } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeIsCartOpen } from "../../store/modules/openingsSlice";
import CartProduct from "./cartProduct/cartProduct";
import CountOrder from "./countOrder/сountOrder";
import { useGetCartQuery } from "../../store/modules/localApiSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Cart({}) {
  const { isCartOpen } = useSelector(({ openings }) => openings);

  const { data: localApiCartData } = useGetCartQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/checkout") dispatch(changeIsCartOpen(false));
  }, [isCartOpen]);

  return (
    <>
      <div className={css.container}>
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
            localApiCartData?.length === 0 && css.noScroll
          )}
        >
          <div className={css.header}>In your cart</div>
          <CartProduct cartProducts={localApiCartData} />
          <CountOrder />
        </div>
      </div>
    </>
  );
}
