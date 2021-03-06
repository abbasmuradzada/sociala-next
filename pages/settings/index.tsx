import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthContextType, useAuth } from "../../context";

const Settings = () => {
  const { logout } = useAuth() as AuthContextType;
  const router = useRouter();
  const onLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
  }, []);

  return (
    <div className="middle-sidebar-left">
      <div className="middle-wrap">
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
          <div className="card-body p-lg-5 p-4 w-100 border-0">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs">
                  Settings
                </h4>
                <div className="nav-caption fw-600 font-xssss text-grey-500 mb-2">
                  Genaral
                </div>
                <ul className="list-inline mb-4">
                  <Link href="settings/account-information">
                    <li
                      className="list-inline-item d-block border-bottom me-0"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="pt-2 pb-2 d-flex align-items-center">
                        <i className="btn-round-md bg-gold-gradiant text-white feather-home font-md me-3" />
                        <h4 className="fw-600 font-xsss mb-0 mt-0">
                          Acount Information
                        </h4>
                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                      </div>
                    </li>
                  </Link>
                </ul>

                <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
                  Acount
                </div>
                <ul className="list-inline mb-4">
                  <Link href="settings/resetpassword">
                    <li
                      className="list-inline-item border-bottom d-block me-0"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="pt-2 pb-2 d-flex align-items-center">
                        <i className="btn-round-md bg-blue-gradiant text-white feather-inbox font-md me-3" />{" "}
                        <h4 className="fw-600 font-xsss mb-0 mt-0">Password</h4>
                        <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                      </div>
                    </li>
                  </Link>
                </ul>

                <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
                  Other
                </div>
                <ul className="list-inline">
                  <li
                    onClick={onLogout}
                    className="list-inline-item border-bottom d-block me-0"
                  >
                    <a className="pt-2 pb-2 d-flex align-items-center">
                      <i className="btn-round-md bg-red-gradiant text-white feather-lock font-md me-3" />{" "}
                      <h4 className="fw-600 font-xsss mb-0 mt-0">Logout</h4>
                      <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
