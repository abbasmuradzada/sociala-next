import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { AuthContextType, useAuth } from "../context";
import { PostService } from "../pages/_api/Post";

interface IProps {
  post: any;
}

const PostLikeSection = ({ post }: IProps) => {
  const { userId } = useAuth() as AuthContextType;
  const [liked, setLiked] = useState(post.likesFrom.includes(userId));
  const [likeCount, setLikeCount] = useState(post.likesFrom.length);

  useEffect(() => {}, []);

  const toggleLikeOrUnlike = () => {
    setLiked((prevState: boolean) => !prevState);
    PostService()
      .likeOrUnlike(post._id)
      .then(() => {
        setLikeCount(!liked ? likeCount + 1 : likeCount - 1);
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
        {likeCount}
      </Typography.Text>
      {liked ? (
        <StarFilled style={{ color: "#ffdb58", fontSize: "24px" }} />
      ) : (
        <StarOutlined style={{ color: "#ffdb58", fontSize: "24px" }} />
      )}
    </Row>
  );
};

export default PostLikeSection;
