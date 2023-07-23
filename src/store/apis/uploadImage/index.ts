import { apiSlice } from "..";

export const uploadImage = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (body) => ({
        url: "/files/upload-image",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = uploadImage;
