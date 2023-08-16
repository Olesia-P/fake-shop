import css from "../styles/pageStyles/index.module.scss";
import {
  usePostCartMutation,
  useGetCartQuery,
} from "../store/modules/localApiSlice";
import { useState } from "react";

export default function Home() {
  const [postCart] = usePostCartMutation();
  const [data, setData] = useState([]);
  const {
    data: localApiCartData = {},
    error,
    isError,
    isLoading,
    isSucces,
  } = useGetCartQuery();

  const testingPost = { id: 999 };

  return (
    <>
      <div className={css.buttonWrap}>
        <div
          className={css.button}
          onClick={() => {
            setData(localApiCartData);
          }}
        >
          Get Button
        </div>
      </div>
      <div className={css.buttonWrap}>
        <div
          className={css.button}
          onClick={() => {
            setData(testingPost);
            postCart(data);
          }}
        >
          Post Button
        </div>
      </div>
      <div className={css.data}> CartID: {data.id}</div>
    </>
  );
}
