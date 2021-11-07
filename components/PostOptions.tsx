import { EllipsisOutlined } from "@ant-design/icons";
import { usePersistFn, useReactive } from "ahooks";
import { Button, Col, Modal, Row } from "antd";
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
  const state = useReactive({
    isModalVisible: false,
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
    </Row>
  );
};

export default PostOptions;
