import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import css from './cart-product.module.scss';
import {
  useAddProductToCartMutation,
  useDeleteProductOrAllProductsInCartMutation,
  useDecreaseProductQuantityMutation,
} from '../../../store/modules/local-api-slice';

export default function CartProduct({ cartProducts }) {
  const router = useRouter();
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);
  // in Layout on load userId is created/taken from cookie

  const [addProductToCart] = useAddProductToCartMutation();

  const [deleteProductOrAllProductsInCart] =
    useDeleteProductOrAllProductsInCartMutation();

  const [decreaseProductQuantity] = useDecreaseProductQuantityMutation();

  return (
    <div>
      {cartProducts?.map((element) => (
        <div key={element.info.id} className={css.product}>
          <div className={css.productInfo}>
            <div
              className={css.title}
              onClick={() => router.push(`/products/${element.info.id}`)}
            >
              {element.info.title}
            </div>

            <div className={css.counterContainer}>
              <div className={css.counterBtn}>
                <AiOutlineMinus
                  className={cx(
                    css.minusBtn,
                    element.quantity <= 1 && css.stopMinusBtn,
                  )}
                  onClick={() => {
                    decreaseProductQuantity({
                      userId,
                      itemId: element.info.id,
                    });
                  }}
                />
              </div>
              <div className={css.counter}>{element.quantity}</div>
              <div className={css.counterBtn}>
                <AiOutlinePlus
                  className={css.plusBtn}
                  onClick={() => {
                    addProductToCart({
                      userId,
                      item: element,
                    });
                  }}
                />
              </div>
            </div>
            <div className={css.price}>
              {(element.info.price * element.quantity).toFixed(2)}$
            </div>
          </div>
          <div className={css.rightSection}>
            <div
              className={css.img}
              onClick={() => router.push(`/products/${element.info.id}`)}
            >
              <img src={element.info.image} alt={element.info.title} />
            </div>
            <div
              className={css.deleteIcon}
              onClick={() => {
                deleteProductOrAllProductsInCart({
                  userId,
                  itemId: element.info.id,
                });
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
