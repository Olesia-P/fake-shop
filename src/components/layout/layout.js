import Navbar from "../navbar/navbar";
import MobileMenu from "../mobileMenu/mobileMenu";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <MobileMenu />
      {children}
    </>
  );
}
