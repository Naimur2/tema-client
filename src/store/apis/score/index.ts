import { apiSlice } from "..";
import { IScoreResponse, IScoreUpdateRequest } from "./types";

export const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateScore: builder.mutation<any, IScoreUpdateRequest>({
      query: (body) => ({
        url: "/score",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["score", "teams"],
    }),
    getScore: builder.query<IScoreResponse, any>({
      query: (id) => ({
        url: `/score/${id}`,
        method: "GET",
      }),
      providesTags: ["score"],
    }),
    deleteScore: builder.mutation({
      query: (id) => ({
        url: `/score/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["score", "teams"],
    }),
  }),
});

export const {
  useUpdateScoreMutation,
  useGetScoreQuery,
  useDeleteScoreMutation,
} = scoreApiSlice;
