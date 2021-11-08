import { useToggle } from "ahooks";
import { Row } from "antd";
import moment from "moment";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FeedLayout } from "../../components/layouts/FeedLayout";
import PostFooter from "../../components/PostFooter";
import PostOptions from "../../components/PostOptions";
import { PostService } from "../_api/Post";

const Feed: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter()
  const [activeCommentSections, setActiveCommentSections] = useState<
    { id: string; active: boolean }[]
  >([]);
  const [getPostsToggle, { toggle: togglePosts }] = useToggle(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login')
  }, [])

  const commentSectionHandler = ({ _id: id }) => {
    setActiveCommentSections(prevState => [
      ...prevState,
      {
        id,
        active: false,
      },
    ]);
  };

  useEffect(() => {
    PostService()
      .getAllPosts()
      .then(({ data: { posts: postsData } }) => {
        setPosts(postsData);
      });
  }, [getPostsToggle]);

  useEffect(() => {
    posts.map(post => {
      commentSectionHandler(post);
    });
  }, [posts]);

  const toggleCommentSection = post => {
    setActiveCommentSections(prevState =>
      prevState.map(postForComment => {
        if (postForComment.id === post._id)
          return {
            id: postForComment.id,
            active: !postForComment.active,
          };
        return postForComment;
      })
    );
  };

  const formatDate = (postDate: string) => {
    const hours = moment().diff(postDate, "hours");
    if (hours > 24) return moment(postDate).locale("az").format("LL");

    return moment(postDate).fromNow();
  };

  return (
    <FeedLayout>
      <>
        {posts.map((post: any) => (
          <div
            className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
            id={post._id}
          >
            <div
              className="card-body p-0 d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <Row>
                <figure className="avatar me-3">
                  <img
                    src={post.postedUser[0].profilePicture}
                    alt="image"
                    className="shadow-sm rounded-circle w45"
                  />
                </figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                  {post?.postedUser[0]?.userName}{" "}
                  <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                    {formatDate(post.updatedAt)}
                  </span>
                </h4>
              </Row>
              <div>
                <PostOptions
                  post={post}
                  togglePosts={togglePosts}
                  getPostsToggle={getPostsToggle}
                />
              </div>
            </div>
            <div className="card-body p-0 me-lg-5">
              <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">
                {post?.content}
              </p>
            </div>

            {post.type === "photo" && (
              <img src={post.postContent} alt="post content" />
            )}
            <PostFooter
              post={post}
              toggleCommentSection={toggleCommentSection}
              activeCommentSections={activeCommentSections}
            />
          </div>
        ))}
      </>
    </FeedLayout>
  );
};

export default Feed;
