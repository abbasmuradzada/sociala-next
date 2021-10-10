import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";
import MainLayout from "../components/layouts/MainLayout";
import { HTTP } from "../pages/_api/axiosconfig";
import "../styles/feather.scss";
import "../styles/global.scss";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  if (Component?.getLayout) {
    return Component?.getLayout(<Component {...pageProps} />);
  }

  HTTP.createClient();

  return (
    <Provider store={store}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Provider>
  );
};

export default App;
