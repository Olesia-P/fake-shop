import Navbar from "../navbar/navbar";
import MobileMenu from "../mobileMenu/mobileMenu";
import Footer from "./footer/footer";
import css from "./layout.module.scss";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className={css.mainContent}>{children}</div>
      <Footer />
    </>
  );
}
