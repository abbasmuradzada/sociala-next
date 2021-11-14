import { InboxOutlined } from "@ant-design/icons";
import { useMount, useReactive } from "ahooks";
import { Button, Image, notification, Row, Upload } from "antd";
import { NotificationInstance } from "antd/lib/notification";
import { RcFile } from "antd/lib/upload";
import { AuthService } from "../../_api/Auth";
import { UserService } from "../../_api/User";

const AccountInformation = () => {
  const state = useReactive({
    profilePicture: "",
    backgroundPicture: "",
    userName: "",
    email: "",
    bio: "",
    uploadedBg: null,
  });

  const getUserData = () => {
    UserService()
      .getOwnUser()
      .then(
        ({
          data: {
            user: { userName, email, profilePicture, backgroundPicture, bio },
          },
        }) => {
          state.email = email;
          state.profilePicture = profilePicture;
          state.userName = userName;
          state.backgroundPicture = backgroundPicture;
          state.bio = bio;
        }
      );
  };

  useMount(() => {
    getUserData();
  });

  const openNotificationWithIcon = (
    type: NotificationInstance,
    description: string
  ) => {
    notification[type]({
      description,
    });
  };

  const uploadImage = (file: RcFile) => {
    const formData = new FormData();
    formData.append("user", file);

    AuthService()
      .uploadProfilePicture(formData)
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Profile picture successfully updated"
        );
        getUserData();
      });
  };

  const uploadBgImage = file => {
    const formData = new FormData();
    formData.append("user", file);

    AuthService()
      .uploadBgImage(formData)
      .then(() => {
        openNotificationWithIcon(
          "success",
          "Profile picture successfully updated"
        );
        getUserData();
      });
  };

  const updateUserNameOrBio = (type: "userName" | "bio") => {
    const formData =
      type === "userName"
        ? {
            userName: state.userName,
          }
        : { bio: state.bio };

    AuthService()
      .updateProfile(formData)
      .then(() => {
        getUserData();
        openNotificationWithIcon(
          "success",
          `${
            type === "userName" ? "Username" : "Biography"
          }  successfully updated`
        );
      });
  };

  const deletePicture = (type: "background" | "profile") => {
    if (type === "profile")
      return AuthService()
        .removeProfilePicture()
        .then(() => {
          getUserData();
          openNotificationWithIcon(
            "success",
            "Profile picture successfully deleted"
          );
        });

    return AuthService()
      .removeBgPicture()
      .then(() => {
        getUserData();
        openNotificationWithIcon(
          "success",
          "Bacground picture successfully deleted"
        );
      });
  };

  return (
    <div className="bg-lightblue theme-dark-bg card w-100 border-0 bg-white shadow-xs p-0 mb-4">
      <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
        <a href="default-settings.html" className="d-inline-block mt-2">
          <i className="ti-arrow-left font-sm" />
        </a>
        <h4 className="font-xs fw-600 ms-4 mb-0 mt-2">Account Details</h4>
      </div>
      <div className="card-body p-lg-5 w-100 border-0 row">
        <Image
          src={state.profilePicture}
          width="50%"
          className="mb-2"
          style={{ maxHeight: "200px" }}
        />

        <Row>
          <Upload
            beforeUpload={e => {
              uploadImage(e);
              return false;
            }}
            maxCount={1}
            showUploadList={false}
            accept="image/*"
          >
            <Button
              type="primary"
              size="large"
              shape="round"
              className="ml-auto"
            >
              <span className="d-none-xs">Upload Profile Picture</span>
            </Button>
          </Upload>

          <Button
            type="primary"
            size="large"
            danger
            shape="round"
            style={{ marginLeft: "10px" }}
            onClick={() => deletePicture("profile")}
          >
            <span className="d-none-xs">Delete Profile Picture</span>
          </Button>
        </Row>

        <form action="#">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="form-group col-lg-6">
                <label className="mont-font fw-600 font-xsss">First Name</label>
                <Row className="col-lg-14" align="middle" wrap={false}>
                  <input
                    type="text"
                    className="form-control col-lg-12"
                    value={state.userName}
                    maxLength={30}
                    onChange={({ target: { value } }) => {
                      state.userName = value;
                    }}
                  />

                  <Button
                    type="primary"
                    size="large"
                    shape="round"
                    style={{ marginLeft: "10px" }}
                    onClick={() => updateUserNameOrBio("userName")}
                  >
                    Update user name
                  </Button>
                </Row>
              </div>
            </div>

            <div className="col-lg-12 mb-3">
              <div className="form-group col-lg-6">
                <label className="mont-font fw-600 font-xsss">Email</label>
                <input
                  disabled
                  type="text"
                  className="form-control"
                  value={state.email}
                  onChange={({ target: { value } }) => {
                    state.email = value;
                  }}
                />
              </div>
            </div>

            <div className="col-lg-12 mb-3 justify-content-center w-100">
              <Image src={state.backgroundPicture} />
            </div>

            <div className="col-lg-12 mb-3">
              <Upload.Dragger
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                onChange={({ file: { status, originFileObj } }) => {
                  if (status === "done") {
                    uploadBgImage(originFileObj);
                  }
                }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload bacground image
                </p>
              </Upload.Dragger>
            </div>

            <div className="col-lg-12 mb-3">
              <label className="mont-font fw-600 font-xsss">Bio</label>
              <textarea
                value={state.bio}
                onChange={({ target: { value } }) => {
                  state.bio = value;
                }}
                className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                rows={5}
                placeholder="Write your message..."
              />
            </div>

            <div className="col-lg-3">
              <Button
                onClick={() => updateUserNameOrBio("bio")}
                size="large"
                shape="round"
                type="primary"
                block
              >
                Save Bio
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInformation;
