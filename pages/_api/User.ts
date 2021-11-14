import { useQuery } from 'react-query';
import { HTTP } from "./axiosconfig";

export function UserService() {
  const getUserIdByUsername = (username: string) => HTTP.client().post("/user/getUserName", {
    userName: username
  });
  const getSingleUser = (id: string) => HTTP.client().get(`/user/${id}`);
  const useGetSingleUser = (id: any) => useQuery(['getSingleUser', id], () => getSingleUser(id))
  const useGetUserIdByUsername = (username: string) => useQuery(['/user/getUserName', username], () => getUserIdByUsername(username))
  const getOwnUser = () => HTTP.client().get('/user/ownProfile')

  return {
    // getUserIdByUsername,
    useGetSingleUser,
    useGetUserIdByUsername,
    getOwnUser,
    getSingleUser
  };
}
