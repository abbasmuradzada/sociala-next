import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { AuthContextType, useAuth } from "../context";
import { CommentService } from "../pages/_api/Comment";

interface IProps {
  comment: any;
}

const CommentLikeSection = ({ comment }: IProps) => {
  const { userId } = useAuth() as AuthContextType;
  const [liked, setLiked] = useState(comment.likesFrom.includes(userId));
  const [likeCount, setLikeCount] = useState(comment.likesFrom.length);

  useEffect(() => {}, []);

  const toggleLikeOrUnlike = () => {
    setLiked((prevState: boolean) => !prevState);
    CommentService()
      .commentLikeOrUnlike(comment._id)
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
        marginTop: "1rem",
        display: "flex",
        alignItems: "center",
        width: "70px",
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

export default CommentLikeSection;
