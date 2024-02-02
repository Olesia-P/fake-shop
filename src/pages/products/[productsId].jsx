/* eslint-disable react/no-unknown-property */
import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PiArrowBendUpLeft } from 'react-icons/pi';
import { useGetOneProductQuery } from '../../store/modules/api-slice';
import { useAddProductToCartMutation } from '../../store/modules/local-api-slice';
import Button from '../../components/button/button';
import css from './productsId.module.scss';

export default function ProductsId() {
  const router = useRouter();
  const productId = router.query.productsId;
  const { data: productData, isSuccess } = useGetOneProductQuery(productId);
  const { userId } = useSelector(({ mixedPurpose }) => mixedPurpose);

  const [addProductToCart] = useAddProductToCartMutation();

  return (
    <div className={css.container}>
      <style jsx global>{`
        body {
          background-color: $grey;
        }
      `}</style>
      <div className={css.card}>
        <div
          onClick={() => router.push('/catalog')}
          className={css.backBtnWrap}
        >
          <div className={css.backBtn}>
            <PiArrowBendUpLeft /> Go back
          </div>
        </div>

        {isSuccess ? (
          <div className={css.product}>
            <div className={css.image}>
              <img src={productData.image} alt={productData.image} />
            </div>
            <div className={css.info}>
              <div className={css.title}>{productData.title}</div>
              <div className={css.description}>{productData.description}</div>
              <div className={css.price}>{productData.price.toFixed(2)}$</div>
              <div className={css.btnWrap}>
                <Button
                  onClick={() =>
                    addProductToCart({
                      userId,
                      item: { info: productData, quantity: 1 },
                    })
                  }
                  width="widthM"
                  fontSize="fontP"
                  text="Add to cart"
                />
              </div>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
