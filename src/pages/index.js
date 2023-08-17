import css from "../styles/pageStyles/index.module.scss";
import {
  usePostCartMutation,
  useLazyGetCartQuery,
} from "../store/modules/localApiSlice";
import { useState } from "react";
import { testCart2 } from "../utils/objects";

export default function Home() {
  const [postCart] = usePostCartMutation();
  // const [data, setData] = useState();

  const [
    getCart,
    { data: localApiCartData, error, isError, isLoading, isSuccess, refetch },
  ] = useLazyGetCartQuery();

  // console.log("localApiCartData", localApiCartData);

  return (
    <>
      <div className={css.buttonWrap}>
        <div
          className={css.button}
          onClick={() => {
            getCart();
          }}
        >
          Get Button
        </div>
      </div>
      <div className={css.buttonWrap}>
        <div
          className={css.button}
          onClick={() => {
            postCart({
              id: 1,
              product: "shirt",
            });
          }}
        >
          Post Button
        </div>
      </div>
      <div className={css.data}>
        Cart:
        {localApiCartData?.map((element) => (
          <div key={element.id}>
            {element.id} {element.product}
          </div>
        ))}
      </div>
    </>
  );
}
