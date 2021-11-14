import { useToggle } from "ahooks";
import { Button, Row, Upload } from "antd";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useQueryClient } from "react-query";
import PostFooter from "../../components/PostFooter";
import PostOptions from "../../components/PostOptions";
import { PrivatePage } from "../../components/PrivatePage";
import { AuthContextType, useAuth } from "../../context";
import { PostService } from "../_api/Post";
import { SubscriptionService } from "../_api/Subscription";
import { UserService } from "../_api/User";

const Profile = () => {
  const router = useRouter();
  const [followBtn, setFollowBtn] = useState("follow");
  const [isPublic, setIsPublic] = useState(true);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [postContent, setPostContent] = useState("");
  const [file, setFile] = useState([]);
  const [fileType, setFileType] = useState<"photo" | "video" | "text">("text");
  const [activeCommentSections, setActiveCommentSections] = useState<
    { id: string; active: boolean }[]
  >([]);
  const [getPosts, { toggle: triggerPosts }] = useToggle(false);

  const userService = UserService();
  const queryClient = useQueryClient();

  const { userName } = useAuth() as AuthContextType;

  const {
    data: getId,
    isLoading,
    isSuccess,
  } = userService.useGetUserIdByUsername(router?.query?.userName);

  const { data, isLoading: userLoading } = userService.useGetSingleUser(
    getId?.data.id
  );

  useEffect(() => {
    queryClient.invalidateQueries(["getSingleUser", getId?.data.id]);
  }, [isLoading]);

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");

    if (userName === router.asPath.split("/")[2]) {
      PostService()
        .getOwnPost()
        .then(({ data: { posts: resPosts } }) => {
          setPosts(resPosts);
        });
    } else if (isSuccess) {
      PostService()
        .getPostOfAnyUser(getId.data.id)
        .then(({ data: { posts: resPosts } }) => {
          setPosts(resPosts);
        });
    }
  }, [getPosts, isSuccess]);

  useEffect(() => {
    setUser(data?.data.user);
    switch (data?.data.isSubscribe) {
      case "false":
        setFollowBtn("follow");
        break;
      case "following":
        setFollowBtn("unfollow");
        break;
      case "pending":
        setFollowBtn("pending");
        break;
      default:
        break;
    }
    if (
      data?.data.isSubscribe !== "following" &&
      data?.data.user.status === "private" &&
      data?.data.user.userName !== userName
    ) {
      setIsPublic(false);
    } else {
      setIsPublic(true);
    }
  }, [userLoading]);

  const commentSectionHandler = ({ _id: id }) => {
    setActiveCommentSections(prevState => [
      ...prevState,
      {
        id,
        active: false,
      },
    ]);
  };

  useEffect(() => {
    posts.map(post => {
      commentSectionHandler(post);
    });
  }, [posts]);

  const toggleFriendRequest = (id: string) => {
    SubscriptionService()
      .toggleFollowRequest(id)
      .then(res => {
        switch (res.data.follow) {
          case "false":
            setFollowBtn("follow");
            break;
          case "following":
            setFollowBtn("unfollow");
            break;
          case "pending":
            setFollowBtn("pending");
            break;
          default:
            break;
        }
      });
  };

  if (!user) {
    return <h1>loading...</h1>;
  }

  const formatDate = (postDate: string) => {
    const hours = moment().diff(postDate, "hours");
    if (hours > 24) return moment(postDate).locale("az").format("LL");

    return moment(postDate).fromNow();
  };

  const toggleCommentSection = post => {
    setActiveCommentSections(prevState =>
      prevState.map(postForComment => {
        if (postForComment.id === post._id)
          return {
            id: postForComment.id,
            active: !postForComment.active,
          };
        return postForComment;
      })
    );
  };

  const postContentHandler = (value: string) => {
    setPostContent(value);
  };

  const fileHandler = (value: any) => {
    setFile([value]);
    if (value?.type.includes("image")) {
      setFileType(() => "photo");
    }
    if (value?.type.includes("video")) {
      setFileType(() => "video");
    }
  };

  const cleanForm = () => {
    setFile([]);
    setFileType("text");
    setPostContent("");
  };

  const createPost = () => {
    if (!file) {
      setFileType(() => "text");
    }

    const formData = new FormData();

    formData.append("content", postContent);
    formData.append("type", file ? fileType : "text");

    if (fileType === "photo" || fileType === "text") {
      if (file) {
        formData.append("image", file[0]);
      }

      return PostService()
        .createPost(formData)
        .then(() => {
          cleanForm();
          triggerPosts(!getPosts);
        });
    }
    if (fileType === "video") {
      if (file) {
        formData.append("video", file[0]);
      }

      return PostService()
        .createVideoPost(formData)
        .then(() => {
          triggerPosts(!getPosts);
          cleanForm();
        });
    }
  };

  return (
    <div className="middle-sidebar-left">
      <div className="row">
        <div className="col-lg-12">
          <div className="card w-100 border-0 p-0 bg-white shadow-xss rounded-xxl">
            <div className="card-body h250 p-0 rounded-xxl overflow-hidden m-3">
              <img src={user?.backgroundPicture} alt="bacground" />
            </div>
            <div className="card-body p-0 position-relative">
              <figure
                className="avatar position-absolute w100 z-index-1"
                style={{ top: "-40px", left: "30px" }}
              >
                <img
                  src={user?.profilePicture}
                  alt="profile pic"
                  className="float-right p-1 bg-white rounded-circle w-100"
                  style={{ width: "100px", height: "100px" }}
                />
              </figure>
              <h4 className="fw-700 font-sm mt-2 mb-lg-5 mb-4 pl-15">
                {user?.userName}{" "}
                <span className="fw-500 font-xssss text-grey-500 mt-1 mb-3 d-block">
                  {user?.email}
                </span>
              </h4>
              <div className="d-flex align-items-center justify-content-center position-absolute-md right-15 top-0 me-2">
                {router?.query?.userName !== userName && (
                  <>
                    <a
                      onClick={() => toggleFriendRequest(user?._id)}
                      className="d-none d-lg-block bg-success p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                    >
                      {followBtn}
                    </a>
                    {/* <a href="#" className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"><i className="feather-mail font-md" /></a> */}
                    {/* <a href="#" id="dropdownMenu4" className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="ti-more font-md tetx-dark" /></a> */}
                  </>
                )}
                <div
                  className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                  aria-labelledby="dropdownMenu4"
                >
                  <div className="card-body p-0 d-flex">
                    <i className="feather-bookmark text-grey-500 me-3 font-lg" />
                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                      Save Link{" "}
                      <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                        Add this to your saved items
                      </span>
                    </h4>
                  </div>
                  <div className="card-body p-0 d-flex mt-2">
                    <i className="feather-alert-circle text-grey-500 me-3 font-lg" />
                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                      Hide Post{" "}
                      <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                        Save to your saved items
                      </span>
                    </h4>
                  </div>
                  <div className="card-body p-0 d-flex mt-2">
                    <i className="feather-alert-octagon text-grey-500 me-3 font-lg" />
                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-0">
                      Hide all from Group{" "}
                      <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                        Save to your saved items
                      </span>
                    </h4>
                  </div>
                  <div className="card-body p-0 d-flex mt-2">
                    <i className="feather-lock text-grey-500 me-3 font-lg" />
                    <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-0">
                      Unfollow Group{" "}
                      <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                        Save to your saved items
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
              <ul
                className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                id="pills-tab"
                role="tablist"
              >
                <li className="active list-inline-item me-5">
                  <a
                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block active"
                    href="#navtabs1"
                    data-toggle="tab"
                  >
                    About
                  </a>
                </li>
                <li className="list-inline-item me-5">
                  <a
                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                    href="#navtabs2"
                    data-toggle="tab"
                  >
                    Membership
                  </a>
                </li>
                <li className="list-inline-item me-5">
                  <a
                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                    href="#navtabs3"
                    data-toggle="tab"
                  >
                    Discussion
                  </a>
                </li>
                <li className="list-inline-item me-5">
                  <a
                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                    href="#navtabs4"
                    data-toggle="tab"
                  >
                    Video
                  </a>
                </li>
                <li className="list-inline-item me-5">
                  <a
                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                    href="#navtabs3"
                    data-toggle="tab"
                  >
                    Group
                  </a>
                </li>
                <li className="list-inline-item me-5">
                  <a
                    className="fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                    href="#navtabs1"
                    data-toggle="tab"
                  >
                    Events
                  </a>
                </li>
                <li className="list-inline-item me-5">
                  <a
                    className="fw-700 me-sm-5 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block"
                    href="#navtabs7"
                    data-toggle="tab"
                  >
                    Media
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
          <Link href={`/followers/${user?.userName}`}>
            <div className="cursor-pointer card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
              <div className="card-body p-3 border-0">
                <div className="row">
                  <div className="col-1" />
                  <div className="col-8 ps-1">
                    <h4 className="font-xsss d-block fw-700 mt-2 mb-0">
                      <i className="profile-statictic-icon feather-users font-md text-black mr-2" />
                      <span className="ms-2">
                        {user?.followersCount ?? 0} Followers
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link href={`/following/${user?.userName}`}>
            <div className="cursor-pointer card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
              <div className="card-body p-3 border-0">
                <div className="row">
                  <div className="col-1" />
                  <div className="col-8 ps-1">
                    <h4 className="font-xsss d-block fw-700 mt-2 mb-0">
                      <i className="profile-statictic-icon feather-user-check font-md text-black mr-2" />
                      <span className="ms-2">
                        {user?.followsCount ?? 0} Follow
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
            <div className="card-body p-3 border-0">
              <div className="row">
                <div className="col-1" />
                <div className="col-8 ps-1">
                  <h4 className="font-xsss d-block fw-700 mt-2 mb-0">
                    <i className="profile-statictic-icon feather-list font-md text-black mr-2" />
                    <span className="ms-2 mb-md-2">
                      {user?.postsCount ?? 0} Post
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-block p-4">
              <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
              <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
                {user?.bio ?? "Nothing"}
              </p>
            </div>
            <div className="card-body border-top-xs d-flex">
              <i className="feather-lock text-grey-500 me-3 font-lg" />
              <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                Private{" "}
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                  What's up, how are you?
                </span>
              </h4>
            </div>

            <div className="card-body d-flex pt-0">
              <i className="feather-eye text-grey-500 me-3 font-lg" />
              <h4 className="fw-700 text-grey-900 font-xssss mt-0">
                Visble{" "}
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                  Anyone can find you
                </span>
              </h4>
            </div>
            <div className="card-body d-flex pt-0">
              <i className="feather-map-pin text-grey-500 me-3 font-lg" />
              <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                Flodia, Austia{" "}
              </h4>
            </div>
            <div className="card-body d-flex pt-0">
              <i className="feather-users text-grey-500 me-3 font-lg" />
              <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                Genarel Group
              </h4>
            </div>
          </div>
          <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center  p-4">
              <h4 className="fw-700 mb-0 font-xssss text-grey-900">Photos</h4>
              <a href="#" className="fw-600 ms-auto font-xssss text-primary">
                See all
              </a>
            </div>
            <div className="card-body d-block pt-0 pb-2">
              <div className="row">
                <div className="col-6 mb-2 pe-1">
                  <a href="images/e-2.jpg" data-lightbox="roadtrip">
                    <img
                      src="images/e-2.jpg"
                      alt="image"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
                <div className="col-6 mb-2 ps-1">
                  <a href="images/e-3.jpg" data-lightbox="roadtrip">
                    <img
                      src="images/e-3.jpg"
                      alt="image"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
                <div className="col-6 mb-2 pe-1">
                  <a href="images/e-4.jpg" data-lightbox="roadtrip">
                    <img
                      src="images/e-4.jpg"
                      alt="image"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
                <div className="col-6 mb-2 ps-1">
                  <a href="images/e-5.jpg" data-lightbox="roadtrip">
                    <img
                      src="images/e-5.jpg"
                      alt="image"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
                <div className="col-6 mb-2 pe-1">
                  <a href="images/e-2.jpg" data-lightbox="roadtrip">
                    <img
                      src="images/e-2.jpg"
                      alt="image"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
                <div className="col-6 mb-2 ps-1">
                  <a href="images/e-1.jpg" data-lightbox="roadtrip">
                    <img
                      src="images/e-1.jpg"
                      alt="image"
                      className="img-fluid rounded-3 w-100"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body d-block w-100 pt-0">
              <a
                href="#"
                className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
              >
                <i className="feather-external-link font-xss me-2" /> More
              </a>
            </div>
          </div>
        </div>
        <div className="col-xl-8 col-xxl-9 col-lg-8">
          {!isPublic ? (
            <PrivatePage />
          ) : (
            <>
              <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3">
                <div className="card-body p-0">
                  <Button
                    type="text"
                    onClick={createPost}
                    className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
                  >
                    <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight" />
                    Create Post
                  </Button>
                </div>
                <div className="card-body p-0 mt-3 position-relative">
                  <figure className="avatar position-absolute ms-2 mt-1 top-5">
                    <img
                      src={user?.profilePicture}
                      alt="profile pic"
                      className="shadow-sm rounded-circle"
                      style={{
                        width: "36px",
                        height: "36px",
                      }}
                    />
                  </figure>
                  <textarea
                    onChange={({ target: { value } }) => {
                      postContentHandler(value);
                    }}
                    value={postContent}
                    name="message"
                    className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    placeholder="What's on your mind?"
                  />
                </div>
                <div className="card-body d-flex p-0 mt-0">
                  <Upload
                    beforeUpload={e => {
                      fileHandler(e);
                      return false;
                    }}
                    maxCount={1}
                    fileList={file}
                    accept="image/*, video/*"
                  >
                    <i className="font-md text-success feather-image me-2" />
                    <span className="d-none-xs">Photo/Video</span>
                  </Upload>
                  <div
                    className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                    aria-labelledby="dropdownMenu8"
                  >
                    <div className="card-body p-0 d-flex">
                      <i className="feather-bookmark text-grey-500 me-3 font-lg" />
                      <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                        Save Link{" "}
                        <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Add this to your saved items
                        </span>
                      </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                      <i className="feather-alert-circle text-grey-500 me-3 font-lg" />
                      <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                        Hide Post{" "}
                        <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Save to your saved items
                        </span>
                      </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                      <i className="feather-alert-octagon text-grey-500 me-3 font-lg" />
                      <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                        Hide all from Group{" "}
                        <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Save to your saved items
                        </span>
                      </h4>
                    </div>
                    <div className="card-body p-0 d-flex mt-2">
                      <i className="feather-lock text-grey-500 me-3 font-lg" />
                      <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">
                        Unfollow Group{" "}
                        <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                          Save to your saved items
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              {posts.map((post: any) => (
                <div
                  className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
                  id={post._id}
                >
                  <div
                    className="card-body p-0 d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Row>
                      <figure className="avatar me-3">
                        <img
                          src={post.postedUser[0].profilePicture}
                          alt="user profile"
                          className="shadow-sm rounded-circle"
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </figure>
                      <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                        {post?.postedUser[0]?.userName}{" "}
                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                          {formatDate(post.updatedAt)}
                        </span>
                      </h4>
                    </Row>
                    <div>
                      <PostOptions
                        post={post}
                        togglePosts={triggerPosts}
                        getPostsToggle={getPosts}
                      />
                    </div>
                  </div>
                  <div className="card-body p-0 me-lg-5">
                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                      {post?.content}
                    </p>
                  </div>

                  {post.type === "photo" && (
                    <img src={post.postContent} alt="post content" />
                  )}
                  {post.type === "video" && (
                    <Row>
                      <ReactPlayer
                        controls
                        url={post.postContent}
                        src={post.postContent}
                      />
                    </Row>
                  )}
                  <PostFooter
                    post={post}
                    toggleCommentSection={toggleCommentSection}
                    activeCommentSections={activeCommentSections}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
