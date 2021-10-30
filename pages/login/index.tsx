import { NextPage } from "next";
import { useRouter } from 'next/router';
import { useState } from "react";
import { AuthContextType, useAuth } from "../../context";
import "../../styles/style.module.css";
// import { signIn } from "next-auth/client";
// import { Login } from "../components/auth";
// import "./";
import { AuthService } from "../_api/Auth";
import { HTTP } from "../_api/axiosconfig";

const LoginPage = () => {
  const [username, setUsername] = useState('salam')
  const [password, setPassword] = useState('')
  const router = useRouter()


  const { saveToken, saveUserId, saveUserName } = useAuth() as AuthContextType


  // @todo http create client must be same instance
  HTTP.createClient();


  const useLogin = (userName, password) => {
    AuthService().login({
      userName,
      password
    }).then(res => {
      saveUserId(res.data.user._id);
      saveToken(res.data.user.token);
      saveUserName(res.data.user.userName);
      router.push('/feed')
    })
  }

  // const sendLoginReq = (credentials) => {
  //   useLogin(credentials.z)
  // }

  return (
    <div>
      {/* <!-- <div className="preloader"></div> --> */}
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <a href="index.html">
              <i className="feather-zap text-success display1-size me-2 ms-0" />
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                Sociala.
              </span>
            </a>
            {/* <!-- <a href="#" className="mob-menu ms-auto me-2 chat-active-btn"><i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i></a> --> */}
            {/* <!-- <a href="default-video.html" className="mob-menu me-2"><i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i></a> --> */}
            {/* <!-- <a href="#" className="me-2 menu-search-icon mob-menu"><i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></a> --> */}
            {/* <!-- <button className="nav-menu me-0 ms-2"></button> --> */}
            {/* <!-- <a href="#" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"  data-bs-toggle="modal" data-bs-target="#Modalregister">Register</a> --> */}

            <a
              className="header-btn d-none cursor-pointer d-lg-block bg-primary bg-current fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl"
              data-bs-toggle="modal"
              data-bs-target="#Modallogin"
            >
              Register
            </a>
            {/* <!-- <a href="#" className="header-btn d-none d-lg-block bg-current fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"  data-bs-toggle="modal" data-bs-target="#Modalregister">Register</a> --> */}
          </div>
        </div>

        <div className="row">
          <div className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover-login bg-no-repeat" />
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Login into <br />
                  your account
                </h2>
                <form>
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pe-0" />
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      v-model="email"
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="enter username or email"
                    />
                  </div>
                  <div className="form-group icon-input mb-1">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      v-model="password"
                      type="Password"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0" />
                  </div>
                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck5"
                    />
                    <label
                      className="form-check-label font-xsss text-grey-500"
                      htmlFor="exampleCheck5"
                    >
                      Remember me
                    </label>
                    <a className="fw-600 font-xsss text-grey-700 mt-1 float-right">
                      Forgot your Password?
                    </a>
                  </div>
                  <div className="form-group mb-1">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        useLogin(username, password)
                      }}
                      type="submit"
                      className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                    >
                      Login
                    </button>
                  </div>
                </form>

                <div className="col-sm-12 p-0 text-left">
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Dont have account
                    <a className="fw-700 ms-1 cursor-pointer">Register</a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default LoginPage;

LoginPage.getLayout = function PageLayout(page: NextPage) {
  return <>{page}</>;
};
