import Navbar from "../navbar/navbar";
import MobileMenu from "../mobileMenu/mobileMenu";
import Footer from "./footer/footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <MobileMenu />
      {children}
      {/* <Footer /> */}
    </>
  );
}
