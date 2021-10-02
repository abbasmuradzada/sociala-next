import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";
import "../styles/global.scss";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  if (Component?.getLayout) {
    return Component?.getLayout(<Component {...pageProps} />);
  }

  return (
    <Provider store={store}>
      <h1>Header</h1>
      <Component {...pageProps} />
      <h1>Footer</h1>
    </Provider>
  );
};

export default App;
