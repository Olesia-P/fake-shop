import React from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import css from './cart-product.module.scss';

import {
  usePostCartMutation,
  useGetCartQuery,
  useDeleteProductMutation,
} from '../../../store/modules/local-api-slice';

export default function CartProduct({ cartProducts }) {
  const router = useRouter();
  const [postCart] = usePostCartMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const { data: localApiCartData, isSuccess: localApiCartDataSuccess } =
    useGetCartQuery();

  const addToCart = (cartProduct) => {
    if (localApiCartDataSuccess) {
      const identicalObject = localApiCartData.find(
        (it) => it.product.id === cartProduct.product.id,
      );
      const finalQuantity = identicalObject.quantity + 1;
      const params = { id: cartProduct.product.id, quantity: finalQuantity };
      postCart(params);
    }
  };

  const minusProduct = (cartProduct) => {
    if (localApiCartDataSuccess) {
      const identicalObject = localApiCartData.find(
        (it) => it.product.id === cartProduct.product.id,
      );
      const finalQuantity =
        identicalObject.quantity > 1 ? identicalObject.quantity - 1 : 1;
      const params = { id: cartProduct.product.id, quantity: finalQuantity };
      postCart(params);
    }
  };

  return (
    <div>
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
                    element.quantity <= 1 && css.stopMinusBtn,
                  )}
                  onClick={() => {
                    minusProduct(element);
                  }}
                />
              </div>
              <div className={css.counter}>{element.quantity}</div>
              <div className={css.counterBtn}>
                <AiOutlinePlus
                  className={css.plusBtn}
                  onClick={() => {
                    addToCart(element);
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
              <img src={element.product.image} alt={element.product.title} />
            </div>
            <div
              className={css.deleteIcon}
              onClick={() => {
                deleteProduct(element.product.id);
              }}
            >
              <MdDelete />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
