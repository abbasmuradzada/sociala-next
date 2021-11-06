import Image from "next/image";
import React, { useState } from "react";
import { SubscriptionService } from "../../pages/_api/Subscription";


const FeedLayout: React.FC = ({ children }) => {
  const [pendingFollowers, setPendingFollowers] = useState([]);

  const { data: limitedPendingUsers, isLoading } = SubscriptionService().useGetLimitedPendingUsers()

  React.useEffect(() => {
    if (!isLoading) setPendingFollowers(limitedPendingUsers?.data.subsList);
  }, [isLoading])

  return (
    <>
      <div className="col-xl-8 col-xxl-9 col-lg-8" >
        {children}
      </div>
      <div className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0">
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
                  href="/"
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
                  href="/"
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
        <div className="card w-100 shadow-xss rounded-xxl border-0 p-0">
          <div className="card-body d-flex align-items-center p-4 mb-0">
            <h4 className="fw-700 mb-0 font-xssss text-grey-900">
              Confirm Friend
            </h4>
            <a
              href="default-member.html"
              className="fw-600 ms-auto font-xssss text-primary"
            >
              See all
            </a>
          </div>
          <div
            className="
                    card-body
                    bg-transparent-card
                    d-flex
                    p-3
                    bg-greylight
                    ms-3
                    me-3
                    rounded-3
                  "
          >
            <figure className="avatar me-2 mb-0">
              <Image
                height="45px"
                width="45px"
                src="/user-7.png"
                alt="image"
                className="shadow-sm rounded-circle w45"
              />
            </figure>
            <h4 className="fw-700 text-grey-900 font-xssss mt-2">
              Anthony Daugloi
              <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                12 mutual friends
              </span>
            </h4>
            <a
              href="/"
              className="
                      btn-round-sm
                      bg-white
                      text-grey-900
                      feather-chevron-right
                      font-xss
                      ms-auto
                      mt-2
                    "
            />
          </div>
          <div
            className="
                    card-body
                    bg-transparent-card
                    d-flex
                    p-3
                    bg-greylight
                    m-3
                    rounded-3
                  "
            style={{ marginBottom: 0 }}
          >
            <figure className="avatar me-2 mb-0">
              <Image
                width="45px" height="45px"
                src="/user-8.png"
                alt="image"
                className="shadow-sm rounded-circle w45"
              />
            </figure>
            <h4 className="fw-700 text-grey-900 font-xssss mt-2">
              David Agfree
              <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                12 mutual friends
              </span>
            </h4>
            <a
              href="/"
              className="
                      btn-round-sm
                      bg-white
                      text-grey-900
                      feather-plus
                      font-xss
                      ms-auto
                      mt-2
                    "
            />
          </div>
          <div
            className="
                    card-body
                    bg-transparent-card
                    d-flex
                    p-3
                    bg-greylight
                    m-3
                    rounded-3
                  "
          >
            <figure className="avatar me-2 mb-0">
              <Image
                width="45px" height="45px"
                src="/user-12.png"
                alt="image"
                className="shadow-sm rounded-circle w45"
              />
            </figure>
            <h4 className="fw-700 text-grey-900 font-xssss mt-2">
              Hugury Daugloi
              <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                12 mutual friends
              </span>
            </h4>
            <a
              href="/"
              className="
                      btn-round-sm
                      bg-white
                      text-grey-900
                      feather-plus
                      font-xss
                      ms-auto
                      mt-2
                    "
            />
          </div>
        </div>
      </div>
    </>
  )
}

export { FeedLayout };

