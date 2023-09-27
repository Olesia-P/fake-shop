/* eslint-disable react/no-unknown-property */
import { useState, React } from 'react';
import css from './checkoutInput.module.scss';

export default function CheckoutInput(props) {
  const { onChange, state, errorMessage, label, name, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  return (
    <>
      <label htmlFor={name} className={css.label}>
        {label}
      </label>
      <input
        id={name}
        className={css.input}
        value={state}
        onChange={(event) => {
          onChange(event);
          event.target.setCustomValidity('');
        }}
        name={name}
        {...inputProps}
        onBlur={() => setFocused(true)}
        focused={focused.toString()}
        onInvalid={(event) =>
          state.length === 0
            ? event.target.setCustomValidity('This field is required')
            : event.target.setCustomValidity('Match the requested format')
        }
      />
      <div className={css.errorMessage}>{errorMessage}</div>
    </>
  );
}
