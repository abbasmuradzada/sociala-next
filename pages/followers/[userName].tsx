import { useRouter } from "next/router";
import { useState } from "react";
import { SubscriptionService } from "../_api/Subscription";
import { UserService } from "../_api/User";

const Followers = () => {
  const router = useRouter()
  const [followers, setFollowers] = useState<any[] | null>(null)

  // @todo-important
  if (router?.query?.userName) {
    UserService().getUserIdByUsername(router?.query?.userName).then((idRes) => {
      SubscriptionService().getFollowers(idRes.data.id).then(res => {
        setFollowers(res.data.followers)
        console.log(res.data.followers);
      }).catch(err => {
        console.log(err);
      })
    })
  }

  if (followers === null) {
    return <h1>loading...</h1>
  }

  if (followers.length === 0) {
    return <h1>there is no any follower</h1>
  }

  return <h1>{router?.query?.userName}</h1>
}

export default Followers