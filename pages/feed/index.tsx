/* eslint-disable no-underscore-dangle */
import moment from "moment";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import CommentSection from '../../components/Comments';
import { FeedLayout } from "../../components/layouts/FeedLayout";
import { PostService } from "../_api/Post";


const Feed: NextPage = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [commentCount, setCommentCount] = useState();
  const [liked, setLiked] = useState(false);
  const [activeCommentSections, setActiveCommentSections] = useState<{ id: string, active: boolean }[]>([])


  const commentSectionHandler = ({ _id: id }) => {
    setActiveCommentSections((prevState) => [...prevState, {
      id,
      active: false
    }])
  }

  useEffect(() => {
    PostService()
      .getAllPosts()
      .then(({ data: { posts: postsData } }) => {
        setPosts(postsData);
      })
  }, []);

  useEffect(() => {
    posts.map(post => {
      commentSectionHandler(post)
    })
  }, [posts])

  const toggleCommentSection = (post) => {
    setActiveCommentSections((prevState) => prevState.map(postForComment => {
      if (postForComment.id === post._id)
        return ({
          id: postForComment.id,
          active: !postForComment.active
        })
      return postForComment;
    }))
  }


  const formatDate = (postDate: string) => {
    const hours = moment().diff(postDate, "hours");
    if (hours > 24) return moment(postDate).locale("az").format("LL");

    return moment(postDate).fromNow();
  }


  return (
    <FeedLayout>

      <>
        {posts.map((post: any) =>
          <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3" id={post._id}>
            <div className="card-body p-0 d-flex">
              <figure className="avatar me-3"><img src={post.postContent} alt="image" className="shadow-sm rounded-circle w45" /></figure>
              <h4 className="fw-700 text-grey-900 font-xssss mt-1">{post?.postedUser[0]?.userName} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{formatDate(post.updatedAt)}</span></h4>
              <a href="#" className="ms-auto"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss" /></a>
            </div>
            <div className="card-body p-0 me-lg-5">
              <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">{post?.content}</p>
            </div>

            {post.type === 'photo' && <img src={post.postContent} alt='post content' />}
            <div className="card-body d-flex p-0">
              {post?.likesFrom.length} Like
              <a className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss" onClick={() => toggleCommentSection(post)}><i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" /><span className="d-none-xss">{commentCount ?? post.commentCount}
                {(commentCount ?? post.commentCount) > 1 ? ' Comments' : ' Comment'}
              </span></a>
            </div>
            <>
              {
                activeCommentSections.find(comment => comment.id === post._id)?.active &&
                <CommentSection post={post} setCommentCount={setCommentCount} />
              }
            </>
          </div>
        )}
      </>
    </FeedLayout>
  )
}

export default Feed

