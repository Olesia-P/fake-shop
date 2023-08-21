import css from "./cart.module.scss";
import cx from "classnames";
import { IoIosBasket } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeIsCartOpen } from "../../store/modules/openingsSlice";
import CartProduct from "./cartProduct/cartProduct";
import CountOrder from "./countOrder/CountOrder";
import { useGetCartQuery } from "../../store/modules/localApiSlice";

export default function Cart({}) {
  const { isCartOpen } = useSelector(({ openings }) => openings);

  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useGetCartQuery();

  const dispatch = useDispatch();
  return (
    <>
      {isCartOpen && (
        <style jsx global>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      )}
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

        <div className={cx(css.cart, isCartOpen && css.open)}>
          <div className={css.header}>In your cart</div>
          <CartProduct cartProducts={localApiCartData} />
          <CountOrder />
        </div>
      </div>
    </>
  );
}

{
  /* <div
        className={cx(css.overlay, isCartOpen && css.open)}
        onClick={() => dispatch(changeIsCartOpen(false))}
      ></div> */
}
