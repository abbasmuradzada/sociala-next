import { useQuery } from 'react-query';
import { HTTP } from "./axiosconfig";

export function UserService() {
  const getUserIdByUsername = (username: string) => HTTP.client().post("/user/getUserName", {
    userName: username
  });
  const getSingleUser = (id: string) => HTTP.client().get(`/user/${id}`);
  const getPostOfAnyUser = (id: string) =>
    HTTP.client().get(`/postpostsOfUser/postsOfUser/${id}`);
  const likeOrUnlike = (id: string) =>
    HTTP.client().post(`/post/likeOrUnlike/${id}`);
  const getAllPosts = () => HTTP.client().get("/post");
  const getOwnPost = () => HTTP.client().get("/post/myProfile");
  const getPostOfSubs = () => HTTP.client().get("/post/postsOfSubs");
  const createVideoPost = (data: any) => HTTP.client ().post("post/video", data);
  const updatePost = (data: any) => HTTP.client().post("post/update", data);


  const useGetSingleUser = (id: any) => useQuery(['getSingleUser', id], () => getSingleUser(id))
  const useGetUserIdByUsername = (username: string) => useQuery(['/user/getUserName', username], () => getUserIdByUsername(username))

  return {
    // getUserIdByUsername,
    useGetSingleUser,
    useGetUserIdByUsername
  };
}
