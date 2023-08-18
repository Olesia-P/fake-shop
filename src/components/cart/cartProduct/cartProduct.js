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
import {
  usePostCartMutation,
  useGetCartQuery,
  useDeleteProductMutation,
} from "../../../store/modules/localApiSlice";

export default function CartProduct({ cartProducts }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [postCart] = usePostCartMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { refetch } = useGetCartQuery();

  return (
    <>
      {cartProducts?.map((element) => (
        <div key={element.product.id} className={css.product}>
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
                    // dispatch(minusToQuantity(element.product.id));
                    postCart({ object: element, type: "minusQuantity" });
                    refetch();
                  }}
                />
              </div>
              <div className={css.counter}>{element.quantity}</div>
              <div className={css.counterBtn}>
                <AiOutlinePlus
                  className={css.plusBtn}
                  onClick={() => {
                    // dispatch(plusToQuantity(element.product.id));
                    postCart({ object: element, type: "plusQuantity" });
                    refetch();
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
              onClick={() => {
                // dispatch(deleteFromCart(element.product.id))
                deleteProduct(element.product.id);
                refetch();
              }}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
