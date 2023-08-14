import css from "./cart.module.scss";
import cx from "classnames";
import { IoIosBasket } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { changeIsCartOpen } from "../../store/modules/openingsSlice";
import { useGetProductsQuery } from "../../store/modules/apiSlice";
import CartProduct from "./cartProduct/cartProduct";
import CountOrder from "./countOrder/CountOrder";

export default function Cart({}) {
  const { isCartOpen } = useSelector(({ openings }) => openings);
  const { cartProducts } = useSelector(({ cart }) => cart);

  const dispatch = useDispatch();
  return (
    <>
      <div className={css.container}>
        <div
          className={css.cartIcon}
          onClick={() => dispatch(changeIsCartOpen(!isCartOpen))}
        >
          <IoIosBasket />
        </div>
        <div className={css.itemCounter}>{cartProducts.length}</div>

        <div className={cx(css.cart, isCartOpen && css.open)}>
          <div className={css.header}>In your cart</div>
          <CartProduct cartProducts={cartProducts} />
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
