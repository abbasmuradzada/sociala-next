import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useReactive } from "ahooks";
import { Row, Typography } from "antd";
import { useEffect } from "react";
import { AuthContextType, useAuth } from "../context";
import { CommentService } from "../pages/_api/Comment";

interface IProps {
  comment: any;
}

const CommentLikeSection = ({ comment }: IProps) => {
  const { userId } = useAuth() as AuthContextType;
  const state = useReactive({
    liked: comment.likesFrom.includes(userId),
    likeCount: comment.likesFrom.length,
  });

  useEffect(() => {}, []);

  const toggleLikeOrUnlike = () => {
    CommentService()
      .commentLikeOrUnlike(comment._id)
      .then(() => {
        state.liked = !state.liked;
        state.likeCount = state.liked
          ? state.likeCount + 1
          : state.likeCount - 1;
      });
  };

  return (
    <Row
      onClick={toggleLikeOrUnlike}
      style={{
        cursor: "pointer",
        marginRight: "1rem",
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        width: "70px",
      }}
    >
      <Typography.Text style={{ marginRight: "5px" }}>
        {state.likeCount}
      </Typography.Text>
      {state.liked ? (
        <StarFilled style={{ color: "#ffdb58", fontSize: "24px" }} />
      ) : (
        <StarOutlined style={{ color: "#ffdb58", fontSize: "24px" }} />
      )}
    </Row>
  );
};

export default CommentLikeSection;
