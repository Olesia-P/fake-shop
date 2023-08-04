/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from "./products.module.scss";
import { useGetProductsQuery } from "../../store/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Products({ category }) {
  const { data: productsData, isSuccess } = useGetProductsQuery(category);

  return (
    <div className={css.container}>
      {isSuccess ? (
        productsData.map((element) => (
          <a
            href={`/products/${element.id}`}
            key={element.id}
            className={css.productContainer}
          >
            <div className={css.img}>
              <img src={element.image} />
            </div>
            <div className={css.title}>{element.title}</div>
            <div className={css.price}>{element.price}$</div>
            <div className={css.addToCartBtn}>Add to cart</div>
          </a>
        ))
      ) : (
        <div>LOADING</div>
      )}
    </div>
  );
}

// const { data: singleProductData = {} } = useGetOneProductQuery();
// const { data: allProductsData, isSuccess } = useGetAllProductsQuery();
// useEffect(() => {
//   if (allProductsData) {
//     dispatch(changeCatalogProducts(allProductsData));
//   }
// console.log("allProductsData", allProductsData);
// }, [allProductsData]);
