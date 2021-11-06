import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Typography } from "antd";

interface IProps {
  likeCount: number;
  liked: boolean;
}

const PostLikeSection = ({ likeCount, liked }: IProps) => (
  <>
    <Typography.Text style={{ marginRight: "5px" }}>
      {likeCount}
    </Typography.Text>
    {liked ? (
      <StarFilled style={{ color: "#ffdb58", fontSize: "24px" }} />
    ) : (
      <StarOutlined style={{ color: "#ffdb58", fontSize: "24px" }} />
    )}
  </>
);

export default PostLikeSection;
