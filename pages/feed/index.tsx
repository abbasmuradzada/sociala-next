import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { PostService } from "../_api/Post";


const Feed: NextPage = () => {
    const [posts, setPosts] = useState([]);

    posts.map(post => {
        console.log("postedUser", post?.postedUser[0]);
    })
    // console.log(posts);



    useEffect(() => {
        PostService()
            .getAllPosts()
            .then((res) => setPosts(res.data.posts));
    }, []);

    return (
        <>
            {posts.map((post: any) => <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                    <figure className="avatar me-3"><img src={post.postContent} alt="image" className="shadow-sm rounded-circle w45" /></figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">{post?.postedUser[0]?.userName} <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">2 hour ago</span></h4>
                    <a href="#" className="ms-auto"><i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                </div>
                {/* <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                    <a href="default-video.html" className="video-btn">
                        video
                    </a>
                </div> */}
                <div className="card-body p-0 me-lg-5">
                    <p className="fw-500 text-grey-500 lh-26 font-xssss w-100 mb-2">{post?.content}</p>
                </div>
                <div className="card-body d-flex p-0">
                    {post?.likesFrom.length} Like
                    <a href="#" className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"><i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg"></i><span className="d-none-xss">{post?.commentCount} Comment</span></a>
                </div>
            </div>)}
        </>
    )
}

export default Feed