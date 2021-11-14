import { HTTP } from "./axiosconfig";

export function StoryService() {
  const getFeedStories = () => HTTP.client().get("/story/storiesOfSubs");
  return {
    getFeedStories
  };
}
