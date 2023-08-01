/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import css from "./products.module.scss";
import { useGetOneProductQuery } from "../../store/modules/apiSlice";

export default function Products() {
  // const {data: allProductsData={}, error, isError, isLoading} = useGetAllProductsQuery();
  const { data: singleProductData = {} } = useGetOneProductQuery();

  console.log(singleProductData);

  return (
    <div className={css.container}>
      <div className={css.productContainer}>
        <img src={singleProductData.image} />
        <div className={css.title}>{singleProductData.title}</div>
        <div className={css.price}>{singleProductData.price}</div>
      </div>
    </div>
  );
}
