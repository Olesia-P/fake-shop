import { useState } from "react";
import css from "../styles/pageStyles/checkout.module.scss";
import CheckoutInput from "../components/checkoutInput/checkoutInput";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    deliveryAddress: "",
    phoneNumber: "",
    comment: "",
  });

  const formFields = [
    {
      lable: "First name",
      type: "text",
      state: formData.firstName,
      name: "firstName",
      required: true,
      errorMessage: "Use letters only",
      pattern: "(^[A-Za-z]+$)",
    },
    {
      lable: "Last name",
      type: "text",
      state: formData.lastname,
      name: "lastname",
      required: true,
      errorMessage: "Use letters only",
      pattern: "(^[A-Za-z]+$)",
    },
    {
      lable: "Email",
      type: "email",
      state: formData.email,
      name: "email",
      required: true,
      errorMessage: "Use a valid email",
    },
    {
      lable: "Delivery address",
      type: "text",
      state: formData.deliveryAddress,
      name: "deliveryAddress",
      required: true,
    },
    {
      lable: "Phone number",
      type: "text",
      state: formData.phoneNumber,
      name: "phoneNumber",
      required: true,
      errorMessage: "Use numbers only",
      pattern: "^[0-9]*$",
    },
    {
      lable: "Comment",
      type: "text",
      state: formData.comment,
      name: "comment",
      required: false,
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // console.log("name", name);
    // console.log("value", value);
  };

  return (
    <form className={css.container}>
      {/*  */}
      <div className={css.orderForm}>
        <div className={css.title}>Checkout</div>
        <div className={css.personalInfo}>
          {formFields.map((element) => (
            <div className={css.inputWrap} key={element.lable}>
              <CheckoutInput {...element} onChange={handleInputChange} />
            </div>
          ))}
        </div>
        <div className={css.productsList}></div>
      </div>
      {/*  */}
      <div className={css.orderFinalInfo}>
        <div className={css.subtotal}></div>
        <div className={css.paymentInfo}></div>
        <button
          type="submit"
          className={css.submit}
          onSubmit={(event) => {
            event.preventDefault();
            {
              console.log("submitted");
            }
          }}
        >
          Place order
        </button>
      </div>
    </form>
  );
}
