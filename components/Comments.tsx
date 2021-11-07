import { useToggle } from "ahooks";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { AuthContextType, useAuth } from "../context";
import { CommentService } from "../pages/_api/Comment";
import CommentLikeSection from "./CommentLikeSection";
import CommentOptions from "./CommentOptions";

interface IProps {
  post: any;
  toggleCommentCount: any;
  commentToggle: any;
}

const Comments = ({ post, commentToggle, toggleCommentCount }: IProps) => {
  const { userId } = useAuth() as AuthContextType;

  const [commentsArr, setCommentsArr] = useState([]);
  const [comment, setComment] = useState("");

  const [getCommentsToggle, { toggle: toggleComments }] = useToggle(false);

  useEffect(() => {
    CommentService()
      .getComments(post._id)
      .then(({ data: { comments } }) => {
        setCommentsArr(comments);
      });
  }, [getCommentsToggle]);

  const addComment = () => {
    if (comment.length > 0) {
      CommentService()
        .addComment(post._id, {
          content: comment,
        })
        .then(() => {
          setComment("");
          CommentService()
            .getComments(post._id)
            .then(({ data: { comments } }) => {
              setCommentsArr(comments);
              toggleCommentCount(commentToggle + 1);
            });
        });
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Divider />
      </Col>

      <Col span={22}>
        <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <Row justify="space-between">
            <Col span={20}>
              <Input
                placeholder="Type your comment"
                name="comment"
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </Col>
            <Col span={3}>
              <Button onClick={addComment}>Add comment</Button>
            </Col>
          </Row>
        </form>
      </Col>

      <Col span={24}>
        {commentsArr &&
          commentsArr.map(comment => (
            <Row style={{ marginTop: "10px" }}>
              <Col span={2}>
                <Avatar src={comment?.commentWriter.profilePicture} />
              </Col>
              <Col span={22}>
                <Card style={{ borderRadius: "10px", background: "#F5F5F5" }}>
                  <Row justify="space-between">
                    <Typography.Text style={{ fontWeight: 700 }} strong>
                      {comment?.commentWriter.userName}
                    </Typography.Text>
                    {(post.postedUser[0]._id === userId ||
                      comment.commentWriter._id === userId) && (
                      <CommentOptions
                        comment={comment}
                        getCommentsToggle={getCommentsToggle}
                        toggleComments={toggleComments}
                        commentToggle={commentToggle}
                        toggleCommentCount={toggleCommentCount}
                        post={post}
                      />
                    )}
                  </Row>
                  <Row>
                    <Typography.Text
                      style={{ color: "#ADB7BF", marginTop: "10px" }}
                    >
                      {comment?.content}
                    </Typography.Text>
                  </Row>

                  <CommentLikeSection comment={comment} />
                </Card>
              </Col>
            </Row>
          ))}
      </Col>
    </Row>
  );
};

export default Comments;
