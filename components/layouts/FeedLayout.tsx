import Image from "next/image";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { SubscriptionService } from "../../pages/_api/Subscription";


const FeedLayout: React.FC = ({ children }) => {
  const [pendingFollowers, setPendingFollowers] = useState([]);

  const subscriptionService = SubscriptionService()
  const queryClient = useQueryClient();

  const { data: limitedPendingUsers, isLoading, isRefetching, isFetching } = SubscriptionService().useGetLimitedPendingUsers()

  React.useEffect(() => {
    if (!isLoading) setPendingFollowers(limitedPendingUsers?.data.subsList);
  }, [isLoading, isRefetching, isFetching])

  const acceptFollowRequest = (id: string) => {
    subscriptionService.acceptFollowRequest(id)
      .then(() => {
        queryClient.invalidateQueries('useGetLimitedPendingUsers');
      })
  }

  const deleteFollowRequest = (id: string) => {
    subscriptionService.deleteFollowRequest(id)
      .then(() => {
        queryClient.invalidateQueries('useGetLimitedPendingUsers');
      })
  }

  return (
    <>
      <div className="col-xl-8 col-xxl-9 col-lg-8" >
        {children}
      </div>
      <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
        {pendingFollowers.length > 0 && 
        <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
          <div className="card-body d-flex align-items-center p-4">
            <h4 className="fw-700 mb-0 font-xssss text-grey-900">
              Friend Request
            </h4>
            <a
              href="default-member.html"
              className="fw-600 ms-auto font-xssss text-primary"
            >
              See all
            </a>
          </div>
          {pendingFollowers?.map(follower => (
            <>
              <div
                className="
                    card-body
                    d-flex
                    pt-4
                    ps-4
                    pe-4
                    pb-0
                    border-top-xs
                    bor-0
                  "
              >
                <figure className="avatar me-3">
                  <Image
                    width="45px" height="45px"
                    src={follower.userFrom.profilePicture}
                    alt="image"
                    className="shadow-sm rounded-circle w45"
                  />
                </figure>
                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                  {follower.userFrom.userName}
                  <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                    12 mutual friends / {follower.userFrom.email}
                  </span>
                </h4>
              </div>
              <div
                className="
                    card-body
                    d-flex
                    align-items-center
                    pt-0
                    ps-4
                    pe-4
                    pb-4
                  "
              >
                <a
                  onClick={() => acceptFollowRequest(follower.userFrom._id)}
                  className="
                      p-2
                      lh-20
                      w100
                      bg-gold-gradiant
                      me-2
                      text-white text-center
                      font-xssss
                      fw-600
                      ls-1
                      rounded-xl
                    "
                >
                  Confirm
                </a>
                <a
                  onClick={() => deleteFollowRequest(follower._id)}
                  className="
                      p-2
                      lh-20
                      w100
                      bg-grey
                      text-grey-800 text-center
                      font-xssss
                      fw-600
                      ls-1
                      rounded-xl
                    "
                >
                  Delete
                </a>
              </div>
            </>
          ))}
        </div>
         }
      </div>
    </>
  )
}

export { FeedLayout };

