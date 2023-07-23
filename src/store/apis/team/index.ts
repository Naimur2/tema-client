import { apiSlice } from "..";

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (body) => ({
        url: "/teams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["teams"],
    }),
    getTeams: builder.query({
      query: () => ({
        url: "/teams",
        method: "GET",
      }),
      providesTags: ["teams"],
    }),
    getTeamById: builder.query({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "GET",
      }),
      providesTags: ["teams"],
    }),
    updateTeam: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teams"],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApiSlice;
