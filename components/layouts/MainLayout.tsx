import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextType, useAuth } from "../../context";
import { SearchService } from "../../pages/_api/Search";

interface IProps {
  children: ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  const queryClient = new QueryClient();
  const { userName } = useAuth() as AuthContextType;

  const [searchUser, setSearchUser] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const router = useRouter();

  const onChangeSearchUser = (val: string) => {
    setSearchUser(val);
    if (val.length > 0) {
      SearchService()
        .searchUser(val)
        .then(res => setSearchedUsers(res.data.result));
    } else {
      setSearchedUsers([]);
    }
  };

  const onSwitchSearchedUser = username => {
    router.push(`/profile/${username}`);
    setSearchedUsers([]);
    setSearchUser("");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-wrapper">
        <div className="nav-header bg-white shadow-xs border-0">
          <div className="nav-top">
            <a href="index.html">
              <i className="feather-zap text-success display1-size me-2 ms-0" />
              <span
                className="
              d-inline-block
              fredoka-font
              ls-3
              fw-600
              text-current
              font-xxl
              logo-text
              mb-0
            "
              >
                Sociala.
              </span>
            </a>
            <a href="/" className="mob-menu ms-auto me-2 chat-active-btn">
              <i
                className="
              feather-message-circle
              text-grey-900
              font-sm
              btn-round-md
              bg-greylight
            "
              />
            </a>
            <a href="default-video.html" className="mob-menu me-2">
              <i
                className="
              feather-video
              text-grey-900
              font-sm
              btn-round-md
              bg-greylight
            "
              />
            </a>
            <a href="/" className="me-2 menu-search-icon mob-menu">
              <i
                className="
              feather-search
              text-grey-900
              font-sm
              btn-round-md
              bg-greylight
            "
              />
            </a>
            <button className="nav-menu me-0 ms-2" />
          </div>

          <form
            action="#"
            className="float-left header-search position-relative"
          >
            <div className="form-group mb-0 icon-input">
              <i className="feather-search font-sm text-grey-400" />
              <input
                value={searchUser}
                onChange={e => onChangeSearchUser(e.target.value)}
                type="text"
                placeholder="Start typing to search.."
                className="
              bg-grey
              border-0
              lh-32
              pt-2
              pb-2
              ps-5
              pe-3
              font-xssss
              fw-500
              rounded-xl
              w350
              theme-dark-bg
            "
              />
            </div>
            <div className="w-100 position-absolute">
              {searchedUsers.length > 0 && (
                <div className="bg-white shadow-md rounded-xxxl p-2">
                  {searchedUsers.map(user => (
                    <div
                      onClick={() => onSwitchSearchedUser(user.userName)}
                      className="text-black border-bottom mb-3 d-flex align-items-center p-1 cursor-pointer"
                    >
                      <Image
                        className="rounded-circle"
                        width={30}
                        height={30}
                        src={user.profilePicture}
                      />
                      <div className="ms-2">{user.userName}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <Link
            href="/notification"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <div className="p-2 text-center ms-auto menu-icon cursor-pointer">
              <span className="dot-count bg-warning" />
              <i className="feather-bell font-xl text-current" />
            </div>
          </Link>
          <div
            className="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg"
            aria-labelledby="dropdownMenu3"
          >
            <h4 className="fw-700 font-xss mb-4">Notification</h4>
            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
              <Image
                width="45px"
                height="45px"
                src="/user-8.png"
                alt="user"
                className="w40 position-absolute left-0"
              />
              <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                Hendrix Stamp
                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                  3 min
                </span>
              </h5>
              <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                There are many variations of pass..
              </h6>
            </div>
            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
              <Image
                width="45px"
                height="45px"
                src="/user-4.png"
                alt="user"
                className="w40 position-absolute left-0"
              />
              <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                Goria Coast
                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                  2 min
                </span>
              </h5>
              <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                Mobile Apps UI Designer is require..
              </h6>
            </div>

            <div className="card bg-transparent-card w-100 border-0 ps-5 mb-3">
              <Image
                width="45px"
                height="45px"
                src="/user-7.png"
                alt="user"
                className="w40 position-absolute left-0"
              />
              <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                Surfiya Zakir
                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                  1 min
                </span>
              </h5>
              <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                Mobile Apps UI Designer is require..
              </h6>
            </div>
            <div className="card bg-transparent-card w-100 border-0 ps-5">
              <Image
                width="45px"
                height="45px"
                src="/user-6.png"
                alt="user"
                className="w40 position-absolute left-0"
              />
              <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                Victor Exrixon
                <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                  30 sec
                </span>
              </h5>
              <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                Mobile Apps UI Designer is require..
              </h6>
            </div>
          </div>
          <a
            href="/"
            className="p-2 text-center ms-3 menu-icon chat-active-btn"
          >
            <i className="feather-message-square font-xl text-current" />
          </a>
          <div
            className="
          p-2
          text-center
          ms-3
          position-relative
          dropdown-menu-icon
          menu-icon
          cursor-pointer
        "
          >
            <i
              className="
            feather-settings
            animation-spin
            d-inline-block
            font-xl
            text-current
          "
            />
            <div className="dropdown-menu-settings switchcolor-wrap">
              <h4 className="fw-700 font-sm mb-4">Settings</h4>
              <h6 className="font-xssss text-grey-500 fw-700 mb-3 d-block">
                Choose Color Theme
              </h6>
              <ul>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="red" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-red"
                      style={{ backgroundColor: "#ff3b30" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="green" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-green"
                      style={{ backgroundColor: "#4cd964" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="blue" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-blue"
                      style={{ backgroundColor: "#132977" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="pink" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-pink"
                      style={{ backgroundColor: "#ff2d55" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="yellow" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-yellow"
                      style={{ backgroundColor: "#ffcc00" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="orange" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-orange"
                      style={{ backgroundColor: "#ff9500" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="gray" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-gray"
                      style={{ backgroundColor: "#8e8e93" }}
                    />
                  </label>
                </li>

                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="brown" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-brown"
                      style={{ backgroundColor: "#d2691e" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="darkgreen" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-darkgreen"
                      style={{ backgroundColor: "#228b22" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="deeppink" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-deeppink"
                      style={{ backgroundColor: "#ffc0cb" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="cadetblue" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-cadetblue"
                      style={{ backgroundColor: "#5f9ea0" }}
                    />
                  </label>
                </li>
                <li>
                  <label className="item-radio item-content">
                    <input type="radio" name="color-radio" value="darkorchid" />
                    <i className="ti-check" />
                    <span
                      className="circle-color bg-darkorchid"
                      style={{ backgroundColor: "#9932cc" }}
                    />
                  </label>
                </li>
              </ul>

              <div className="card bg-transparent-card border-0 d-block mt-3">
                <h4 className="d-inline font-xssss mont-font fw-700">
                  Header Background
                </h4>
                <div className="d-inline float-right mt-1">
                  <label className="toggle toggle-menu-color">
                    <input type="checkbox" />
                    <span className="toggle-icon" />
                  </label>
                </div>
              </div>
              <div className="card bg-transparent-card border-0 d-block mt-3">
                <h4 className="d-inline font-xssss mont-font fw-700">
                  Menu Position
                </h4>
                <div className="d-inline float-right mt-1">
                  <label className="toggle toggle-menu">
                    <input type="checkbox" />
                    <span className="toggle-icon" />
                  </label>
                </div>
              </div>
              <div className="card bg-transparent-card border-0 d-block mt-3">
                <h4 className="d-inline font-xssss mont-font fw-700">
                  Dark Mode
                </h4>
                <div className="d-inline float-right mt-1">
                  <label className="toggle toggle-dark">
                    <input type="checkbox" />
                    <span className="toggle-icon" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <a href="default-settings.html" className="p-0 ms-3 menu-icon">
            <Image
              width="45px"
              height="45px"
              src="/profile-4.png"
              alt="user"
              className="w40 mt--1"
            />
          </a>
        </div>

        <nav className="navigation scroll-bar">
          <div className="container ps-0 pe-0">
            <div className="nav-content">
              <div
                className="
              nav-wrap
              bg-white bg-transparent-card
              rounded-xxl
              shadow-xss
              pt-3
              pb-1
              mb-2
              mt-2
            "
              >
                <div className="nav-caption fw-600 font-xssss text-grey-500">
                  <span>New </span>Feeds
                </div>
                <ul className="mb-1 top-content">
                  <li className="logo d-none d-xl-block d-lg-block" />
                  <Link href="/feed">
                    <li className="cursor-pointer">
                      <a className="nav-content-bttn open-font">
                        <i className="feather-tv btn-round-md bg-blue-gradiant me-3" />
                        <span>Newsfeed</span>
                      </a>
                    </li>
                  </Link>
                  <li className="cursor-pointer">
                    <a
                      href="default-storie.html"
                      className="nav-content-bttn open-font"
                    >
                      <i className="feather-globe btn-round-md bg-gold-gradiant me-3" />
                      <span>Explore Stories</span>
                    </a>
                  </li>
                  <Link href={`/profile/${userName}`}>
                    <li className="cursor-pointer">
                      <a
                        href="user-page.html"
                        className="nav-content-bttn open-font"
                      >
                        <i className="feather-user btn-round-md bg-gold-gradiant me-3" />
                        <span>Author Profile </span>
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>

              <div
                className="
              nav-wrap
              bg-white bg-transparent-card
              rounded-xxl
              shadow-xss
              pt-3
              pb-1
            "
              >
                <div className="nav-caption fw-600 font-xssss text-grey-500">
                  <span /> Account
                </div>
                <Link href="/settings">
                  <ul className="mb-1">
                    <li className="logo d-none d-xl-block d-lg-block" />
                    <li>
                      <a
                        href="default-settings.html"
                        className="nav-content-bttn open-font h-auto pt-2 pb-2"
                      >
                        <i className="font-sm feather-settings me-3 text-grey-500" />
                        <span>Settings</span>
                      </a>
                    </li>
                  </ul>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="main-content right-chat-active">
          <div className="middle-sidebar-bottom">
            <div className="middle-sidebar-left">
              <div className="row feed-body">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default MainLayout;
