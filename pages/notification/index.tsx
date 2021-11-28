import { useMount, useReactive } from "ahooks";
import moment from "moment";
import Link from "next/link";
import { NotificationService } from "../_api/Notification";

const Notifications = () => {
  const state = useReactive({
    notifications: [],
  });

  useMount(() => {
    NotificationService()
      .getNotifications()
      .then(({ data: { notifications } }) => {
        state.notifications = notifications;
      });
  });

  const formatDate = (postDate: string) => {
    const hours = moment().diff(postDate, "hours");
    if (hours > 24) return moment(postDate).locale("az").format("LL");

    return moment(postDate).fromNow();
  };

  return (
    <div className="col-xl-12">
      <div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
        <h2 className="fw-700 mb-4 mt-2 font-md text-grey-900 d-flex align-items-center">
          Notification
          <span className="circle-count bg-warning text-white font-xsssss rounded-3 ms-2 ls-3 fw-600 p-2  mt-0">
            {
              state.notifications.filter(
                notification => notification?.isNewNotification
              ).length
            }
          </span>
        </h2>
        {state.notifications?.map(notification => (
          <ul className="notification-box mb-2">
            <li
              className={`p-3 rounded-3 ${
                notification?.isNewNotification
                  ? "bg-new-notification"
                  : "bg-grey"
              }`}
            >
              <img
                src={notification?.userFrom?.[0].profilePicture}
                alt="user"
                className="w45 me-3"
              />
              <Link href={`/profile/${notification?.userFrom?.[0].userName}`}>
                <strong style={{ cursor: "pointer" }}>
                  {notification?.userFrom?.[0].userName}
                </strong>
              </Link>
              <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20">
                {notification?.content}
                <span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto">
                  {" "}
                  {formatDate(notification?.createdAt)}
                </span>{" "}
              </h6>
              <i className="ti-more-alt text-grey-500 font-xs ms-auto" />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
