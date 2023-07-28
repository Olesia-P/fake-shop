import css from "./cart.module.scss";
import { IoIosBasket } from "react-icons/io";

export default function Cart() {
  return (
    <div className={css.container}>
      <div className={css.containerCart}>
        <IoIosBasket />
      </div>
      <div className={css.itemCounter}>1</div>
    </div>
  );
}
