import { EllipsisOutlined } from "@ant-design/icons";
import { usePersistFn, useReactive } from "ahooks";
import { Button, Col, Divider, Input, Modal, Row, Upload } from "antd";
import { useState } from "react";
import { AuthContextType, useAuth } from "../context";
import { PostService } from "../pages/_api/Post";
import { ReportService } from "../pages/_api/Report";

interface IProps {
  post: any;
  togglePosts: any;
  getPostsToggle: any;
}

const PostOptions = ({ post, getPostsToggle, togglePosts }: IProps) => {
  const { userId } = useAuth() as AuthContextType;
  const [file, setFile] = useState([]);
  const state = useReactive({
    isModalVisible: false,
    isEditModalVisible: false,
    isImageEditModalVisible: false,
    fileType: post.type,
    file: [],
    content: post?.content,
  });

  const modalHandler = usePersistFn(() => {
    state.isModalVisible = !state.isModalVisible;
  });

  const afterSuccessfullRequest = () => {
    togglePosts(!getPostsToggle);
    state.isModalVisible = !state.isModalVisible;
  };

  const deletePost = () => {
    PostService()
      .deletePost(post._id)
      .then(() => {
        afterSuccessfullRequest();
      });
  };

  const reportPostOwner = () => {
    ReportService()
      .reportUser(post.postedUser[0]._id, { type: "text" })
      .then(() => {
        afterSuccessfullRequest();
      });
  };

  const updateContent = () => {
    modalHandler();
    state.isEditModalVisible = !state.isEditModalVisible;
  };

  const handleOk = () => {
    PostService()
      .updatePost({ _id: post._id, content: state.content })
      .then(() => {
        state.isEditModalVisible = !state.isEditModalVisible;
        togglePosts(!getPostsToggle);
      });
  };

  const handleCancel = usePersistFn(() => {
    state.isEditModalVisible = false;
    state.isImageEditModalVisible = false;
  });

  const fileHandler = (value: any) => {
    setFile([value]);
    if (value?.type.includes("image")) {
      state.fileType = "photo";
    }
    if (value?.type.includes("video")) {
      state.fileType = "video";
    }
  };

  const cleanForm = () => {
    setFile([]);
    state.fileType = "text";
    state.isImageEditModalVisible = false;
  };

  const handleImageOk = () => {
    if (!file) {
      state.fileType = "text";
    }

    const formData = new FormData();

    formData.append("type", file ? state.fileType : "text");

    if (state.fileType === "photo" || state.fileType === "text") {
      if (file) {
        formData.append("image", file[0]);
      }

      return PostService()
        .updatePostPhoto(post._id, formData)
        .then(() => {
          cleanForm();
          togglePosts(!getPostsToggle);
        });
    }
    if (state.fileType === "video") {
      cleanForm();
    }
  };

  const updateImageOrVideo = () => {
    state.isModalVisible = false;
    state.isImageEditModalVisible = !state.isImageEditModalVisible;
  };

  return (
    <Row>
      <EllipsisOutlined
        style={{ cursor: "pointer", fontSize: "24px" }}
        onClick={modalHandler}
      />
      <Modal
        visible={state.isModalVisible}
        closable
        centered
        onCancel={modalHandler}
        footer={false}
        width={300}
      >
        <Col
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {post.postedUser[0]._id !== userId && (
            <>
              <Button
                danger
                type="primary"
                shape="round"
                size="large"
                onClick={reportPostOwner}
                style={{ height: "50px", width: "150px" }}
              >
                Report
              </Button>
            </>
          )}
          {post.postedUser[0]._id === userId && (
            <>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={updateContent}
                style={{ height: "50px", width: "150px" }}
              >
                Update Content
              </Button>
              {post.type !== "text" && (
                <>
                  <Divider />
                  <Button
                    type="primary"
                    shape="round"
                    size="large"
                    onClick={updateImageOrVideo}
                    style={{
                      height: "55px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {post?.postContent ? "Update " : "Add "}
                    Image / Video
                  </Button>
                </>
              )}
              <Divider />
              <Button
                danger
                type="primary"
                shape="round"
                size="large"
                onClick={deletePost}
                style={{ height: "50px", width: "150px" }}
              >
                Delete Post
              </Button>
            </>
          )}
        </Col>
      </Modal>
      <Modal
        visible={state.isEditModalVisible}
        closable
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        width={300}
      >
        <Col
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input
            style={{
              marginTop: "1.5rem",
            }}
            name="postContent"
            value={state.content}
            onChange={({ target: { value } }) => {
              state.content = value;
            }}
          />
        </Col>
      </Modal>
      <Modal
        visible={state.isImageEditModalVisible}
        closable
        centered
        onOk={handleImageOk}
        onCancel={handleCancel}
        width={300}
      >
        <Col
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
        </Col>
      </Modal>
    </Row>
  );
};

export default PostOptions;
