import { HTTP } from "./axiosconfig";

export function ReportService() {
    const reportPost = (id: string, data: { type: string }) => HTTP.client().post(`/report/post/${id}`, data);

    return {
        reportPost
    };
}
