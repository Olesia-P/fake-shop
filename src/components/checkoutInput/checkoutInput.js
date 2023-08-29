import { useState } from "react";
import css from "./checkoutInput.module.scss";

export default function CheckoutInput(props) {
  const { onChange, state, errorMessage, lable, ...inputProps } = props;

  const [unfocused, setUnfocused] = useState(false);

  return (
    <>
      <label className={css.lable}>{lable}</label>
      <input
        className={css.input}
        value={state}
        onChange={(event) => onChange(event)}
        {...inputProps}
        onBlur={() => setUnfocused(true)}
        unfocused={unfocused.toString()}
        onInvalid={(event) => {
          state.length === 0
            ? event.target.setCustomValidity("This field is required")
            : event.target.setCustomValidity("Match the requested format");
        }}
      />
      <div className={css.errorMessage}>{errorMessage}</div>
    </>
  );
}
