import css from "./CountOrder.module.scss";
import { useSelector } from "react-redux";
import { countOrderCost } from "../../../utils/functions";

export default function CountOrder() {
  const { cartProducts } = useSelector(({ cart }) => cart);
  const sum = countOrderCost(cartProducts);
  return (
    <>
      {cartProducts.length > 0 && (
        <div className={css.containerCount}>
          <div className={css.card}>
            <div className={css.receiptSum}>
              <div className={css.title}>Final cost</div>
              <div className={css.sum}>{sum}₴</div>
            </div>
            <div className={css.submitBtnContainer}>
              <div className={css.submitBtn}>Order</div>
            </div>
          </div>
        </div>
      )}
      {cartProducts.length === 0 && <p>Cart is empty!</p>}
    </>
  );
}
