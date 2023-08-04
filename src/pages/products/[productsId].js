/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import css from "./productsId.module.scss";
import { PiArrowBendUpLeft } from "react-icons/pi";
import { useGetOneProductQuery } from "../../store/modules/apiSlice";

export default function ProductsId() {
  const router = useRouter();
  const productId = router.query.productsId;
  const { data: productData, isSuccess } = useGetOneProductQuery(productId);

  return (
    <div className={css.container}>
      <div className={css.card}>
        <a href={`/catalog`} className={css.backBtnWrap}>
          <div className={css.backBtn}>
            <PiArrowBendUpLeft /> Go back
          </div>
        </a>

        {isSuccess ? (
          <div className={css.product}>
            <div className={css.image}>
              <img src={productData.image} />
            </div>
            <div className={css.info}>
              <div className={css.title}>{productData.title}</div>
              <div className={css.description}>{productData.description}</div>
              <div className={css.price}>{productData.price}$</div>
              <div className={css.addToCartBtn}>Add to cart</div>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}
