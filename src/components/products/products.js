/* eslint-disable jsx-a11y/alt-text */

import css from "./products.module.scss";
import { useGetProductsQuery } from "../../store/modules/apiSlice";
import {
  usePostCartMutation,
  useGetCartQuery,
} from "../../store/modules/localApiSlice";
import { useRouter } from "next/router";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";
import cx from "classnames";

export default function Products({ category, filter }) {
  const params = {
    category: category,
    filter: filter,
  };
  const {
    data: productsData,
    isSuccess: productsDataSuccess,
    isLoading: catalogLoading,
  } = useGetProductsQuery(params);
  const router = useRouter();
  const [postCart] = usePostCartMutation();
  const [specificProductLoading, setSpecificProductLoading] = useState(null);
  const [buttonDisabled, setButtondisabled] = useState(false);

  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess: localApiCartDataSuccess,
  } = useGetCartQuery();

  const addToCart = async (product) => {
    setSpecificProductLoading(product.id);
    setButtondisabled(true);
    if (localApiCartDataSuccess) {
      const identicalObject = localApiCartData.find(
        (it) => it.product.id === product.id
      );
      const finalQuantity =
        product.id === identicalObject?.product.id
          ? identicalObject.quantity + 1
          : 1;
      const params = { id: product.id, quantity: finalQuantity };

      try {
        await postCart(params); // Wait for the cart mutation to finish
        setSpecificProductLoading(null); // Reset loading product after the mutation is complete
        setButtondisabled(false);
      } catch {}
    }
  };

  return (
    <div className={css.container}>
      {productsDataSuccess ? (
        productsData.map((element) => (
          <div key={element.id} className={css.productContainer}>
            <div
              className={css.img}
              onClick={() => router.push(`/products/${element.id}`)}
            >
              <img src={element.image} />
            </div>
            <div
              className={css.title}
              onClick={() => router.push(`/products/${element.id}`)}
            >
              {element.title}
            </div>
            <div
              className={css.price}
              onClick={() => router.push(`/products/${element.id}`)}
            >
              {element.price}$
            </div>

            <div
              className={cx(css.addToCartBtn, buttonDisabled && css.disabled)}
              onClick={() => {
                addToCart(element);
              }}
              aria-disabled={buttonDisabled}
            >
              {specificProductLoading === element.id && (
                <BiLoaderAlt className={css.loading} />
              )}
              Add to cart
            </div>
          </div>
        ))
      ) : (
        <div
        // className={css.loadingGlobalWrap}
        >
          {catalogLoading && <BiLoaderAlt className={css.loadingGlobal} />}
          <div className={css.loadingCaption}>Loading...</div>
        </div>
      )}
    </div>
  );
}
