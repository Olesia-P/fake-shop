/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from "./products.module.scss";
import { useGetProductsQuery } from "../../store/modules/apiSlice";
// import { addToCart } from "../../store/modules/cartSlice";
import { useDispatch } from "react-redux";
import {
  usePostCartMutation,
  useGetCartQuery,
} from "../../store/modules/localApiSlice";

import { useRouter } from "next/router";

export default function Products({ category, filter }) {
  const params = {
    category: category,
    filter: filter,
  };
  const { data: productsData, isSuccess } = useGetProductsQuery(params);
  const router = useRouter();
  const dispatch = useDispatch();
  const [postCart] = usePostCartMutation();
  const { refetch } = useGetCartQuery();

  return (
    <div className={css.container}>
      {isSuccess ? (
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
              // onClick={() => dispatch(addToCart(element))}
              onClick={() => {
                postCart({ object: element, type: "addToCart" });
                refetch();
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
