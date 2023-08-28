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

export default function Products({ category, filter }) {
  const params = {
    category: category,
    filter: filter,
  };
  const { data: productsData, isSuccess: productsDataSuccess } =
    useGetProductsQuery(params);
  const router = useRouter();
  const [postCart] = usePostCartMutation();
  const [specificProductLoading, setSpecificProductLoading] = useState(null);

  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess: localApiCartDataSuccess,
  } = useGetCartQuery();

  const addToCart = async (product) => {
    setSpecificProductLoading(product.id);
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
              className={css.addToCartBtn}
              onClick={() => {
                addToCart(element);
              }}
            >
              {specificProductLoading === element.id && (
                <BiLoaderAlt className={css.loading} />
              )}
              Add to cart
            </div>
          </div>
        ))
      ) : (
        <div>LOADING</div>
      )}
    </div>
  );
}
