import { useToggle } from "ahooks";
import CommentSection from "../components/Comments";
import PostLikeSection from "./PostLikeSection";

interface IProps {
  toggleCommentSection: any;
  post: any;
  activeCommentSections: any;
}

const PostFooter = ({
  toggleCommentSection,
  post,
  activeCommentSections,
}: IProps) => {
  // const [commentCount, setCommentCount] = useState(post.commentCount);
  const [commentCount, { toggle: toggleCommentCount }] = useToggle(
    post.commentCount
  );

  return (
    <div>
      <div className="card-body d-flex p-0">
        <PostLikeSection post={post} />
        <a
          className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
          onClick={() => toggleCommentSection(post)}
        >
          <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />
          <span className="d-none-xss">
            {commentCount}
            {commentCount > 1 ? " Comments" : " Comment"}
          </span>
        </a>
      </div>
      <div>
        {activeCommentSections?.find(comment => comment.id === post._id)
          ?.active && (
          <CommentSection
            post={post}
            commentToggle={commentCount}
            toggleCommentCount={toggleCommentCount}
          />
        )}
      </div>
    </div>
  );
};

export default PostFooter;
