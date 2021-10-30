import 'antd/dist/antd.css';
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../app/store";
import MainLayout from "../components/layouts/MainLayout";
import { AuthProvider } from "../context/index";
import { HTTP } from "../pages/_api/axiosconfig";
import "../styles/feather.scss";
import "../styles/global.scss";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  if (Component?.getLayout) {
    return Component?.getLayout(<AuthProvider><Component {...pageProps} /></AuthProvider>);
  }

  HTTP.createClient();

  return (
    <Provider store={store}>
      <AuthProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthProvider>
    </Provider>
  );
};

export default App;
