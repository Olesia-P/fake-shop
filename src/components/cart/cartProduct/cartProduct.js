/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from "./cartProduct.module.scss";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {
  deleteFromCart,
  plusToQuantity,
  minusToQuantity,
} from "../../../store/modules/cartSlice";
import cx from "classnames";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function CartProduct({ cartProducts }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      {cartProducts.map((element) => (
        <div
          key={element.product.id}
          className={css.product}
          // onClick={() => router.push(`/products/${element.product.id}`)}
        >
          <div className={css.productInfo}>
            <div
              className={css.title}
              onClick={() => router.push(`/products/${element.product.id}`)}
            >
              {element.product.title}
            </div>

            <div className={css.counterContainer}>
              <div className={css.counterBtn}>
                <AiOutlineMinus
                  className={cx(
                    css.minusBtn,
                    element.quantity <= 1 && css.stopMinusBtn
                  )}
                  onClick={() => {
                    dispatch(minusToQuantity(element.product.id));
                  }}
                />
              </div>
              <div className={css.counter}>{element.quantity}</div>
              <div className={css.counterBtn}>
                <AiOutlinePlus
                  className={css.plusBtn}
                  onClick={() => {
                    dispatch(plusToQuantity(element.product.id));
                  }}
                />
              </div>
            </div>
            <div className={css.price}>
              {element.product.price * element.quantity}$
            </div>
          </div>
          <div className={css.rightSection}>
            <div
              className={css.img}
              onClick={() => router.push(`/products/${element.product.id}`)}
            >
              <img src={element.product.image} />
            </div>
            <div
              className={css.deleteIcon}
              onClick={() => dispatch(deleteFromCart(element.product.id))}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
