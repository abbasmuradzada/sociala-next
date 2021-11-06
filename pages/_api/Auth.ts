import { HTTP } from "./axiosconfig";

export function AuthService() {
  const login = ({ userName, password }: { userName: string, password: string }) => HTTP.client().post(`/auth/login`, {
    userName,
    password,
  });

  const register = ({ userName, password, email }: { userName: string, password: string, email: string }) => HTTP.client().post(`/auth/register`, {
    userName,
    password,
    email,
  });

  const resetPassword = ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) => HTTP.client().put(`/auth/changePassword`, {
    oldPassword,
    newPassword,
  })

  // const getPostOfAnyUser = (id: string) =>
  //   HTTP.client().get(`/postpostsOfUser/postsOfUser/${id}`);
  // const likeOrUnlike = (id: string) =>
  //   HTTP.client().post(`/post/likeOrUnlike/${id}`);
  // const getAllPosts = () => HTTP.client().get("/post");
  // const getOwnPost = () => HTTP.client().get("/post/myProfile");
  // const getPostOfSubs = () => HTTP.client().get("/post/postsOfSubs");
  // const createVideoPost = (data: any) => HTTP.client ().post("post/video", data);
  // const useGetFollowers = (id: any) => useQuery(['getFollowers', id], () => getFollowers(id))


  return {
    login,
    register,
    resetPassword
  };
}
