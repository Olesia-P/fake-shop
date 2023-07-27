import "../styles/globals.scss";
import Header from "../components/header";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
