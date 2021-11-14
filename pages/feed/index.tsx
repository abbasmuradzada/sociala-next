import { useToggle } from "ahooks";
import { Row } from "antd";
import moment from "moment";
import type { NextPage } from "next";
// import Stories from 'react-insta-stories';
// import Stories from 'react-insta-stories';
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Stories from 'react-insta-stories';
import ReactPlayer from "react-player/lazy";
import { FeedLayout } from "../../components/layouts/FeedLayout";
import PostFooter from "../../components/PostFooter";
import PostOptions from "../../components/PostOptions";
import { PostService } from "../_api/Post";
import { StoryService } from "../_api/Story";




const Feed: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const [storyShow, setStoryShow] = useState(false)
  const [stories, setStories] = useState([])
  const [activeCommentSections, setActiveCommentSections] = useState<
    { id: string; active: boolean }[]
  >([]);
  const [getPostsToggle, { toggle: togglePosts }] = useToggle(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/login");
    StoryService().getFeedStories()
      .then(res => {
        const a = res.data.stories?.map((story: any) => ({
          url: story.storyContent, header: {
            heading: story.postedUser[0].userName,
            subheading: `${moment().diff(story.createdAt, "hours")} hours ago`,
            profileImage: story.postedUser[0].profilePicture,
          },
        }))
        setStories(a);
      })
  }, []);

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

  // const stories = [
  //   'http://cdn.cnn.com/cnnnext/dam/assets/211004122539-restricted-15-the-simpsons-balenciaga-paris-fashion-week.jpg',
  //   'https://www.cheatsheet.com/wp-content/uploads/2021/03/The-Simpsons-family-1.jpg',
  //   // 'https://mohitkarekar.com/icon.png',
  // ];

  return (
    <FeedLayout>
      {/* {!!storyShow && <Stories
			stories={stories}
			defaultInterval={5000}
			width={432}
			height="100vh"
		/>} */}
      {storyShow && <div
        // onClick={() => setStoryShow(false)}
        style={{
          height: '100vh',
          width: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.9)',
          position: 'absolute',
          left: 0,
          top: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 9999
        }} >
        <Stories
          stories={stories}
          defaultInterval={5000}
          width={432}
          height="100%"
          onAllStoriesEnd={() => setStoryShow(false)}
        />
      </div>}
      <>
        <div className='d-flex'>
          <div onClick={() => setStoryShow(true)} className="item me-2">
            <div data-bs-toggle="modal" data-bs-target="#Modalstory" className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
              style={{ backgroundImage: "url(http://cdn.cnn.com/cnnnext/dam/assets/211004122539-restricted-15-the-simpsons-balenciaga-paris-fashion-week.jpg);" }}
            >
              <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                <a>
                  <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src="http://cdn.cnn.com/cnnnext/dam/assets/211004122539-restricted-15-the-simpsons-balenciaga-paris-fashion-week.jpg" alt="image" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" style={{ opacity: 1 }} /></figure>
                  <div className="clearfix" />
                  <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Victor Exrixon </h4>
                </a>
              </div>
            </div>
          </div>
          {/* <div onClick={() => setStoryShow(true)} className="item">
            <div data-bs-toggle="modal" data-bs-target="#Modalstory" className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
              style={{ backgroundImage: "url(http://cdn.cnn.com/cnnnext/dam/assets/211004122539-restricted-15-the-simpsons-balenciaga-paris-fashion-week.jpg);" }}
            >
              <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                <a>
                  <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1"><img src="http://cdn.cnn.com/cnnnext/dam/assets/211004122539-restricted-15-the-simpsons-balenciaga-paris-fashion-week.jpg" alt="image" className="float-right p-0 bg-white rounded-circle w-100 shadow-xss" style={{ opacity: 1 }} /></figure>
                  <div className="clearfix" />
                  <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">Victor Exrixon </h4>
                </a>
              </div>
            </div>
          </div> */}
        </div>
        {posts.map((post: any) => (
          <div
            className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3"
            id={post._id}
          >
            <div
              className="card-body p-0 d-flex"
              style={{ justifyContent: "space-between" }}
            >
              <Link href={`/profile/${post?.postedUser[0]?.userName}`}>
                <Row style={{ cursor: "pointer" }}>
                  <figure className="avatar me-3">
                    <img
                      src={post.postedUser[0].profilePicture}
                      alt="profile pic"
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
              </Link>
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

            {post.type === "video" && (
              <Row>
                <ReactPlayer
                  controls
                  url={post.postContent}
                  src={post.postContent}
                />
              </Row>
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
