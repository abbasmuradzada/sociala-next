import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryClient } from 'react-query';
import { SubscriptionService } from "../_api/Subscription";
import { UserService } from "../_api/User";

const Followers = () => {
  const router = useRouter()
  const [followers, setFollowers] = useState<any[] | null>(null)

  const userService = UserService()
  const subscriptionService = SubscriptionService()
  const queryClient = useQueryClient();

  const { data: getId, isLoading } = userService.useGetUserIdByUsername(router?.query?.userName)

  const { data, isLoading: followersLoading } = subscriptionService.useGetFollowers(getId?.data.id)

  useEffect(() => {
    queryClient.invalidateQueries(['getFollowers', getId?.data.id]);
  }, [isLoading])

  useEffect(() => {
    setFollowers(data?.data.followers);
  }, [followersLoading])

  if (followers === null) {
    return <h1>loading...</h1>
  }

  if (followers?.length === 0) {
    return <h1>there is no any follower</h1>
  }

  return <h1>{router?.query?.userName}</h1>
}

export default Followers