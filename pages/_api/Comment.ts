import { HTTP } from "./axiosconfig";

export function CommentService() {
  const addComment = (id: string, data: { content: string }) =>
    HTTP.client().post(`/comment/${id}`, data);
  const updateComment = (id: string, data: { content: string }) =>
    HTTP.client().put(`/comment/update/${id}`, data);
  const commentLikeOrUnlike = (id: string) =>
    HTTP.client().post(`/comment/likeOrUnlike/${id}`);
  const deleteYourPostComment = (data: { postId: string; commentId: string }) =>
    HTTP.client().delete(`/comment/yourPost`, { data });
  const deleteYourComment = (commentId: string, data: { postId: string }) =>
    HTTP.client().delete(`/comment/own/${commentId}`, { data });
  const getComments = (postId: string) =>
    HTTP.client().get(`/comment/${postId}`);

  return {
    addComment,
    updateComment,
    commentLikeOrUnlike,
    deleteYourPostComment,
    deleteYourComment,
    getComments,
  };
}
