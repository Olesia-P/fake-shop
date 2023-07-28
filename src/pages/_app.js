import "../styles/globals.scss";
import Header from "../components/header/header";
import { Provider } from "react-redux";
import { store } from "../store/index";
import MobileMenu from "../components/mobileMenu/mobileMenu";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <MobileMenu />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
