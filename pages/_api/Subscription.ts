import { useQuery } from 'react-query';
import { HTTP } from "./axiosconfig";

export function SubscriptionService() {
  const getFollowers = (id: string) => HTTP.client().get(`/subscription/followers/${id}`);
  // const getPostOfAnyUser = (id: string) =>
  //   HTTP.client().get(`/postpostsOfUser/postsOfUser/${id}`);
  // const likeOrUnlike = (id: string) =>
  //   HTTP.client().post(`/post/likeOrUnlike/${id}`);
  // const getAllPosts = () => HTTP.client().get("/post");
  // const getOwnPost = () => HTTP.client().get("/post/myProfile");
  // const getPostOfSubs = () => HTTP.client().get("/post/postsOfSubs");
  // const createVideoPost = (data: any) => HTTP.client ().post("post/video", data);
  const useGetFollowers = (id: any) => useQuery(['getFollowers', id], () => getFollowers(id))


  return {
    useGetFollowers
  };
}
