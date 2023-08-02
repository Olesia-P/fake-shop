/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from "./products.module.scss";
import {
  //   useGetOneProductQuery,
  useGetAllProductsQuery,
  // useLazyGetAllProductsQuery,
} from "../../store/modules/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { changeCatalogProducts } from "../../store/modules/catalogSlice";
import { useEffect } from "react";

export default function Products() {
  // const { data: singleProductData = {} } = useGetOneProductQuery();
  const { data: allProductsData = {}, isSuccess } = useGetAllProductsQuery();
  //  const [getAllProductsQuery, { data: allProductsData = {}, isSuccess }] =
  //  useLazyGetAllProductsQuery();

  const { catalogProducts } = useSelector(({ catalog }) => catalog);
  const dispatch = useDispatch();
  // if (isSuccess) {
  // dispatch(changeCatalogProducts(allProductsData));
  // }

  if (isSuccess) {
    console.log(allProductsData);
  }

  return (
    <div className={css.container}>
      {/* {allProductsData.map((element) => (
        <div key={element.id} className={css.productContainer}>
          <img src={element.image} />
          <div className={css.title}>{element.title}</div>
          <div className={css.price}>{element.price}</div>
        </div>
      ))} */}
    </div>
  );
}

// useEffect(() => {
// setTimeout(() => dispatch(changeCatalogProducts(allProductsData)), 1000);
// if (catalogProducts !== []) {
//   setTimeout(() => dispatch(changeCatalogProducts(allProductsData)), 1000);
// }
// getAllProductsQuery();
// if (typeof allProductsData !== "object") {
// dispatch(changeCatalogProducts(allProductsData));
// }
// }, []);

// useEffect(() => {
//   getAllProductsQuery();
//   if (isSuccess) console.log(allProductsData);
//   console.log(isSuccess);
// }, [allProductsData]);

// if (catalogProducts !== []) {
//   console.log(catalogProducts);
// }
