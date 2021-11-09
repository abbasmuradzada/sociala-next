import { HTTP } from "./axiosconfig";

export function PostService() {
  const deletePost = (id: string) => HTTP.client().delete(`/post/${id}`);
  const getSinglePost = (id: string) => HTTP.client().get(`/post/${id}`);
  const getPostOfAnyUser = (id: string) =>
    HTTP.client().get(`/postpostsOfUser/postsOfUser/${id}`);
  const likeOrUnlike = (id: string) =>
    HTTP.client().post(`/post/likeOrUnlike/${id}`);
  const getAllPosts = () => HTTP.client().get("/post");
  const getOwnPost = () => HTTP.client().get("/post/myProfile");
  const getPostOfSubs = () => HTTP.client().get("/post/postsOfSubs");
  const createPost = (data: { content: string, type: 'photo' | 'video', image: any }) => HTTP.client().post("/post", data);
  const createVideoPost = (data: { content: string, type: 'photo' | 'video', video: any }) => HTTP.client().post("post/video", data);
  const updatePost = (data: any) => HTTP.client().post("post/update", data);

  return {
    deletePost,
    getSinglePost,
    getOwnPost,
    getPostOfAnyUser,
    likeOrUnlike,
    getAllPosts,
    getPostOfSubs,
    createVideoPost,
    createPost,
    updatePost,
  };
}
