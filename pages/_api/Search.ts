import { HTTP } from "./axiosconfig";

export function SearchService() {
    const searchUser = (userName: string) => HTTP.client().post('/search/', { userName, });

    return {
        searchUser
    };
}
