import { StarFilled, StarOutlined } from "@ant-design/icons";
import { useReactive } from "ahooks";
import { Row, Typography } from "antd";
import { useEffect } from "react";
import { AuthContextType, useAuth } from "../context";
import { PostService } from "../pages/_api/Post";

interface IProps {
  post: any;
}

const PostLikeSection = ({ post }: IProps) => {
  const { userId } = useAuth() as AuthContextType;
  const state = useReactive({
    liked: post.likesFrom.includes(userId),
    likeCount: post.likesFrom.length,
  });

  useEffect(() => {}, []);

  const toggleLikeOrUnlike = () => {
    PostService()
      .likeOrUnlike(post._id)
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
        display: "flex",
        alignItems: "center",
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

export default PostLikeSection;
