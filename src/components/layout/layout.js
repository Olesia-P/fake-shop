import Navbar from "../navbar/navbar";
import MobileMenu from "../mobileMenu/mobileMenu";
import Footer from "./footer/footer";
import css from "./layout.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { changeLastOrderId } from "../../store/modules/lastOrderIdSlice";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (router.path !== "/finishedOrder") {
      dispatch(changeLastOrderId(""));
    }
  }, [router.path]);

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className={css.mainContent}>{children}</div>
      <Footer />
    </>
  );
}
