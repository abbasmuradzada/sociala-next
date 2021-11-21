import { HTTP } from "./axiosconfig";

export function NotificationService() {
    const getNotifications = () =>
        HTTP.client().get(`/notification/myNotifications`);

    return {
        getNotifications,
    };
}
