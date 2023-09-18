/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import css from "./productsId.module.scss";
import { PiArrowBendUpLeft } from "react-icons/pi";
import { useGetOneProductQuery } from "../../store/modules/apiSlice";
import {
  usePostCartMutation,
  useGetCartQuery,
} from "../../store/modules/localApiSlice";
import Button from "../../components/button/button";

export default function ProductsId() {
  const router = useRouter();
  const productId = router.query.productsId;
  const { data: productData, isSuccess } = useGetOneProductQuery(productId);

  const [postCart] = usePostCartMutation();

  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess: localApiCartDataSuccess,
  } = useGetCartQuery();

  const addToCart = (product) => {
    if (localApiCartDataSuccess) {
      const identicalObject = localApiCartData.find(
        (it) => it.product.id === product.id
      );
      const finalQuantity =
        product.id === identicalObject?.product.id
          ? identicalObject.quantity + 1
          : 1;
      const params = { id: product.id, quantity: finalQuantity };
      postCart(params);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.card}>
        <div
          onClick={() => router.push(`/catalog`)}
          className={css.backBtnWrap}
        >
          <div className={css.backBtn}>
            <PiArrowBendUpLeft /> Go back
          </div>
        </div>

        {isSuccess ? (
          <div className={css.product}>
            <div className={css.image}>
              <img src={productData.image} />
            </div>
            <div className={css.info}>
              <div className={css.title}>{productData.title}</div>
              <div className={css.description}>{productData.description}</div>
              <div className={css.price}>{productData.price}$</div>
              <div className={css.btnWrap}>
                <Button
                  onClick={() => addToCart(productData)}
                  // isFetching={false}
                  // isDisabled={false}
                  width={"widthM"}
                  fontSize={"fontP"}
                  // isWide={false}
                  // type={"button"}
                  // onSubmit={null}
                  text={"Add to cart"}
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
