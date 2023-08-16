import css from "../styles/pageStyles/index.module.scss";
import { usePostCartMutation } from "../store/modules/localApiSlice";

export default function Home() {
  const [postCart] = usePostCartMutation();
  // const handleSubmit = async () => {
  //   await postCart({ cart: "cart" });
  // };
  return (
    <>
      <div className={css.buttonWrap}>
        <div
          className={css.button}
          onClick={() => {
            postCart({ cart: "cart" });
          }}
        >
          Button
        </div>
      </div>
      <div></div>
    </>
  );
}
