import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { updateToken } from "../features/auth";
import type { RootState } from "../index";

const BASE_URL = process.env["REACT_APP_API_URL"];

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, api) => {
    const { auth } = api.getState() as RootState;
    if (auth.token) {
      headers.set("authorization", `Bearer ${auth.token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: any,
  api: any,
  extraOptions: any
): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    const { auth } = api.getState() as RootState;
    const refresh: any = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: {
          refreshToken: auth.refreshToken,
        },
      },
      api,
      extraOptions
    );

    if (
      refresh.data &&
      refresh?.data?.data?.accessToken &&
      refresh?.data?.data?.refreshToken
    ) {
      const refreshedData = {
        token: refresh.data?.data?.accessToken,
        refreshToken: refresh.data?.data?.refreshToken,
      };

      api.dispatch(updateToken(refreshedData));

      result = await baseQuery(args, api, extraOptions);
      return result;
    } else {
      api.dispatch(
        updateToken({
          token: null,
          refreshToken: null,
        })
      );
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "teams",
    "events",
    "folders",
    "stats",
    "users",
    "user",
    "singleEvent",
  ],
  endpoints: (builder) => ({}),
});

export default apiSlice.reducer;
