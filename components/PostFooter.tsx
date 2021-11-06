import { useState } from "react";
import PostLikeSection from "../components/PostLikeSection";

interface IProps {
  toggleCommentSection: any;
  post: any;
  commentCount: any;
}

const PostFooter = ({ toggleCommentSection, post, commentCount }: IProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="card-body d-flex p-0">
      <div
        onClick={() => {
          setLiked(!liked);
        }}
        style={{
          cursor: "pointer",
          marginRight: "1rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <PostLikeSection likeCount={post?.likesFrom.length} liked={liked} />
      </div>
      <a
        className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
        onClick={() => toggleCommentSection(post)}
      >
        <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />
        <span className="d-none-xss">
          {commentCount ?? post.commentCount}
          {(commentCount ?? post.commentCount) > 1 ? " Comments" : " Comment"}
        </span>
      </a>
    </div>
  );
};

export default PostFooter;
