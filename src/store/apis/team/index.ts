import {
  ICreateTeamRes,
  TDeleteTeamArg,
  IDeleteTeamResponse,
  ITeamData,
  ITeamsData,
  IUpdateTeamArgs,
  IUpdateTeamRes,
  TCreateTeamArgs,
  TTeamDataArg,
} from "types/team";
import { apiSlice } from "..";

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation<ICreateTeamRes, TCreateTeamArgs>({
      query: (body) => ({
        url: "/teams",
        method: "POST",
        body,
      }),
      invalidatesTags: ["teams"],
    }),
    getTeams: builder.query<ITeamsData, void>({
      query: () => ({
        url: "/teams",
        method: "GET",
      }),
      providesTags: ["teams"],
    }),
    getTeamById: builder.query<ITeamData, TTeamDataArg>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "GET",
      }),
      providesTags: ["teams"],
    }),
    updateTeam: builder.mutation<IUpdateTeamRes, IUpdateTeamArgs>({
      query: ({ id, ...body }) => ({
        url: `/teams/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["teams"],
    }),
    deleteTeam: builder.mutation<IDeleteTeamResponse, TDeleteTeamArg>({
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
