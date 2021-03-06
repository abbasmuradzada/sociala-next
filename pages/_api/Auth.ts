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
    // status: "public",
  });

  const resetPassword = ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) => HTTP.client().put(`/auth/changePassword`, {
    oldPassword,
    newPassword,
  })

  const uploadProfilePicture = (data: { user: any }) => HTTP.client().post('/auth/profilePicture', data)
  const uploadBgImage = (data: { user: any }) => HTTP.client().post('/auth/backgroundPicture', data)
  const updateProfile = (data: { userName?: string, bio?: string }) => HTTP.client().put('/auth/updateProfile', data)
  const removeProfilePicture = () => HTTP.client().delete('/auth/removePicture')
  const removeBgPicture = () => HTTP.client().delete('/auth/removeBackgroundPicture')


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
    resetPassword,
    uploadProfilePicture,
    uploadBgImage,
    updateProfile,
    removeBgPicture,
    removeProfilePicture
  };
}
