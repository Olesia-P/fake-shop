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
import { useDispatch, useSelector } from "react-redux";
import Button from "../button/button";
import { changeIsCartOpen } from "../../store/modules/openingsSlice";

export default function Products() {
  const { catalogCategory, catalogFilters } = useSelector(
    ({ catalog }) => catalog
  );
  const params = {
    category: catalogCategory,
    filter: catalogFilters,
  };
  const {
    data: productsData,
    isSuccess: productsDataSuccess,
    isLoading: catalogLoading,
    isFetching,
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

  const dispatch = useDispatch();

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
      {productsDataSuccess && !isFetching ? (
        productsData.map((element) => (
          <div key={element.id} className={css.productContainer}>
            <div
              className={css.img}
              onClick={() => {
                router.push(`/products/${element.id}`);
                dispatch(changeIsCartOpen(false));
              }}
            >
              <img src={element.image} />
            </div>
            <div
              className={css.title}
              onClick={() => {
                router.push(`/products/${element.id}`);
                dispatch(changeIsCartOpen(false));
              }}
            >
              {element.title}
            </div>
            <div
              className={css.price}
              onClick={() => {
                router.push(`/products/${element.id}`);
                dispatch(changeIsCartOpen(false));
              }}
            >
              {element.price}$
            </div>
            <Button
              clickHandler={() => {
                addToCart(element);
              }}
              isFetching={specificProductLoading === element.id}
              isDisabled={buttonDisabled}
              width={"widthM"}
              fontSize={"fontP"}
              isWide={false}
              type={"button"}
              onSubmit={null}
              text={"Add to cart"}
            />
          </div>
        ))
      ) : (
        <div>
          {isFetching && <BiLoaderAlt className={css.loadingGlobal} />}
          <div className={css.loadingCaption}>Loading...</div>
        </div>
      )}
    </div>
  );
}
