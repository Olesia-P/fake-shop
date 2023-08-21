/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from "./products.module.scss";
import { useGetProductsQuery } from "../../store/modules/apiSlice";
import {
  usePostCartMutation,
  useGetCartQuery,
} from "../../store/modules/localApiSlice";

import { useRouter } from "next/router";
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
  const [elementQuantity, setElementQuantity] = useState();
  const {
    data: localApiCartData,
    error,
    isError,
    isLoading,
    isSuccess: localApiCartDataSuccess,
  } = useGetCartQuery();

  console.log(localApiCartData);

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
                if (localApiCartDataSuccess) {
                  const identicalObject = localApiCartData.find(
                    (it) => it.product.id === element.id
                  );

                  element.id === identicalObject?.product.id
                    ? setElementQuantity(
                        localApiCartData.find(
                          (it) => it.product.id === element.id
                        ).quantity + 1
                      )
                    : setElementQuantity(1);
                  postCart({ id: element.id, quantity: elementQuantity });
                }
              }}
            >
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
