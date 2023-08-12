import MySwal from "components/MySwal";
import { login, logout, updateToken } from "store/features/auth";

import { apiSlice } from "../index";
import { redirect } from "react-router";
import {
  IDashBoardData,
  IAssignTeamArgs,
  IAssignTeamRes,
} from "types/dashboard";
import {
  IDeleteAUserArgs,
  IDeleteAUserRes,
  IGetAUserArgs,
  IGetAUserRes,
  IUsersData,
} from "types/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = (await queryFulfilled) as any;

          if (result.data && result.data.user.role === "Admin") {
            dispatch(
              login({
                token: result.data.accessToken,
                user: result.data.user,
                refreshToken: result.data.refreshToken,
              })
            );
            redirect("/dashboard");
          }

          return result;
        } catch (error: any) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.data?.message,
            confirmButtonColor: "#3085d6",
            customClass: {
              confirmButton: `bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                    w-full sm:w-auto
                                    `,
              actions: "flex justify-center gap-2",
            },
          });
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const result = (await queryFulfilled) as any;

          if (result) {
            dispatch(logout());
            localStorage.clear();
            redirect("/");
          }

          return result;
        } catch (error: any) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: error?.data?.message,
            confirmButtonColor: "#3085d6",
            customClass: {
              confirmButton: `bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                                    w-full sm:w-auto
                                    `,
              actions: "flex justify-center gap-2",
            },
          });
        }
      },
      invalidatesTags: ["stats", "users"],
    }),

    // work here
    getUsers: builder.query<IUsersData, void>({
      query: () => ({
        url: "/auth/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    getAUser: builder.query<IGetAUserRes, IGetAUserArgs>({
      query: (id) => ({
        url: `/auth/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user", "teams"],
    }),

    deleteAUser: builder.mutation<IDeleteAUserRes, IDeleteAUserArgs>({
      query: (id) => ({
        url: `/auth/delete-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    getStat: builder.query<IDashBoardData, void>({
      query: () => ({
        url: "/auth/stat",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),

    assignTeam: builder.mutation<IAssignTeamRes, IAssignTeamArgs>({
      query: ({ id, data }) => ({
        url: `/auth/assign-team/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users", "user", "teams"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useGetStatQuery,
  useDeleteAUserMutation,
  useGetAUserQuery,
  useAssignTeamMutation,
} = authApiSlice;
