import Link from "next/link";
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

  useEffect(() => {
    if (!localStorage.getItem('token')) router.push('/login')
  }, [])

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

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
          <div className="card-body d-flex align-items-center p-0">
            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Followers</h2>
            {/* <div className="search-form-2 ms-auto">
              <i className="ti-search font-xss" />
              <input type="text" className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0" placeholder="Search here." />
            </div>
            <a href="#" className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"><i className="feather-filter font-xss text-grey-500" /></a> */}
          </div>
        </div>

        <div className="row ps-2 pe-1">
          {
            followers?.map((follower: any) => (
              <div className="col-md-4 col-sm-6 pe-2 ps-2">
                <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                  <div className="card-body d-block w-100 p-4 text-center">
                    <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                      <img src={follower.user_from[0].profilePicture} alt="profile" className="float-right p-1 bg-white rounded-circle w-100" /></figure>
                    <div className="clearfix" />
                    <h4 className="fw-700 font-xss mt-3 mb-0">{follower.user_from[0].userName}</h4>
                    <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">{follower.user_from[0].email}</p>
                    <ul className="d-flex align-items-center justify-content-center mt-1">
                      <li className="m-2">
                        <h4 className="fw-700 font-sm">{follower.user_from[0].postsCount} <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Post</span>
                        </h4>
                      </li>
                      <li className="m-2">
                        <h4 className="fw-700 font-sm">{follower.user_from[0].followersCount} <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Follower</span>
                        </h4>
                      </li>
                      <li className="m-2">
                        <h4 className="fw-700 font-sm">{follower.user_from[0].followsCount} <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">Followings</span>
                        </h4>
                      </li>
                    </ul>
                    <Link href={`/profile/${follower.user_from[0].userName}`}>
                      <a className="mt-4 p-0 btn p-2 lh-24 w150 ms-1 ls-3 d-inline-block rounded-xl bg-cyan font-xsssss fw-700 ls-lg text-white">SHOW PROFILE</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Followers