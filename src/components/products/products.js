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

  // const [getAllProductsQuery, { data: allProductsData = [], isSuccess }] =
  // useLazyGetAllProductsQuery();

  const { catalogProducts } = useSelector(({ catalog }) => catalog);
  const dispatch = useDispatch();
  dispatch(changeCatalogProducts(["jhjkujki"]));

  // if (isSuccess) {
  // dispatch(changeCatalogProducts(allProductsData));
  // }

  // console.log(catalogProducts);

  // const { data: allProductsData, isSuccess } = useGetAllProductsQuery();

  // useEffect(() => {
  //   if (allProductsData) {
  //     dispatch(changeCatalogProducts(allProductsData));
  //   }
  // }, [allProductsData]);

  // console.log(allProductsData, "allProductsData");
  console.log(catalogProducts, "catalogProducts");

  // useEffect(() => {
  //   const { data: allProductsData = [], isSuccess } = useGetAllProductsQuery();
  // }, []);

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
