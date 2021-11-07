import { EllipsisOutlined } from "@ant-design/icons";
import { usePersistFn, useReactive } from "ahooks";
import { Button, Col, Modal, Row } from "antd";
import { AuthContextType, useAuth } from "../context";
import { CommentService } from "../pages/_api/Comment";

interface IProps {
  comment: any;
  toggleComments: any;
  getCommentsToggle: any;
  post: any;
}

const CommentOptions = ({
  comment,
  toggleComments,
  getCommentsToggle,
  post,
}: IProps) => {
  const { userId } = useAuth() as AuthContextType;
  const state = useReactive({
    isModalVisible: false,
  });

  const modalHandler = usePersistFn(() => {
    state.isModalVisible = !state.isModalVisible;
  });

  const afterSuccessfullRequest = () => {
    toggleComments(!getCommentsToggle);
    state.isModalVisible = !state.isModalVisible;
  };

  const deleteComment = () => {
    if (post.postedUser[0]._id === userId)
      return CommentService()
        .deleteYourPostComment({
          postId: post._id,
          commentId: comment._id,
        })
        .then(() => {
          afterSuccessfullRequest();
        });

    if (comment.commentWriter._id === userId)
      return CommentService()
        .deleteYourComment(comment._id, {
          postId: post._id,
        })
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
          <Button
            danger
            type="primary"
            shape="round"
            size="large"
            onClick={deleteComment}
            style={{
              height: "50px",
              width: "150px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Delete Comment
          </Button>
        </Col>
      </Modal>
    </Row>
  );
};

export default CommentOptions;
