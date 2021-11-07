import { HTTP } from "./axiosconfig";

export function ReportService() {
    const reportUser = (id: string, data: { type: string }) => HTTP.client().post(`/report/${id}`, data);

    return {
        reportUser
    };
}
